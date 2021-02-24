import React, { useState } from 'react';
import { Input, Row, Col, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { withTranslation } from 'react-i18next';
import Copy from '../../../utils/copy';

const { TextArea } = Input;

interface Props {
  t(code: string): string;
}

const RemoveDupLines = ({ t }: Props) => {
  const [result, setResult] = useState<string | undefined>(undefined);

  const onTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const original = event.target.value;

      const resultValue = original
        .split('\n')
        .filter((item: string, i: number, allItems: string[]) => {
          return i === allItems.indexOf(item);
        })
        .join('\n');

      setResult(resultValue);
    } catch (error) {
      if (event.target.value) {
        setResult(error.message);
      } else {
        setResult(undefined);
      }
    }
  };

  return (
    <Row style={{ padding: '15px', height: '100%' }}>
      <Col span={12}>
        <TextArea
          rows={23}
          onChange={onTextAreaChange}
          className="textarea-input"
        />
      </Col>
      <Col span={11} offset={1}>
        <Button icon={<CopyOutlined />} onClick={() => Copy(result)}>
          {t('commons.buttons.copy')}
        </Button>
        <TextArea rows={23} value={result} className="pre-response" />
      </Col>
    </Row>
  );
};

export default withTranslation()(RemoveDupLines);
