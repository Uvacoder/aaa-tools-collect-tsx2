/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Input, Row, Col, Select, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { withTranslation } from 'react-i18next';
import Copy from '../../../utils/copy';

const { TextArea } = Input;
const { Option } = Select;

interface Props {
  t(code: string): string;
}

const Base64 = ({ t }: Props) => {
  const [original, setOriginal] = useState<string | undefined>(undefined);
  const [result, setResult] = useState<string | undefined>(undefined);
  const [action, setAction] = useState<string>('encode');

  const EncodeDecode = (value: string | undefined) => {
    if (value) {
      switch (action) {
        case 'encode':
          setResult(Buffer.from(value, 'utf-8').toString('base64'));
          break;
        case 'decode':
          setResult(Buffer.from(value, 'base64').toString('utf-8'));
          break;
        default:
          break;
      }
    } else {
      setResult(undefined);
    }
  };

  useEffect(() => {
    EncodeDecode(original);
  }, [action]);

  const onTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      setOriginal(event.target.value);
      EncodeDecode(event.target.value);
    } catch (error) {
      setOriginal(undefined);
      if (event.target.value) {
        setResult(error.message);
      } else {
        setResult(undefined);
      }
    }
  };

  const onSelectChange = (value: string) => {
    setAction(value);
  };

  return (
    <Row style={{ padding: '15px', height: '100%' }}>
      <Col span={12}>
        <Select
          defaultValue="encode"
          style={{ width: 120, marginBottom: '5px' }}
          onChange={onSelectChange}
        >
          <Option value="encode">Encode</Option>
          <Option value="decode">Decode</Option>
        </Select>
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
        <TextArea rows={23} value={result} className="textarea-input" />
      </Col>
    </Row>
  );
};

export default withTranslation()(Base64);
