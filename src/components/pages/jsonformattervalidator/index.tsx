/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Input, Row, Col, Select, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import Prism from 'prismjs';
import { withTranslation } from 'react-i18next';
import CodeView from '../../commons/codeView';
import Copy from '../../../utils/copy';

const { TextArea } = Input;
const { Option } = Select;

interface Props {
  t(code: string): string;
}

const JSONFormatterValidator = ({ t }: Props) => {
  const [jsonValue, setJsonValue] = useState<string | null>(null);
  const [jsonParsed, setJsonParsed] = useState<string | undefined>('');
  const [space, setSpace] = useState<number>(2);
  const [primsAlreadyCalled, setPrimsAlreadyCalled] = useState<boolean>(false);

  const parseJson = (value: string | null) => {
    if (value) {
      setJsonParsed(JSON.stringify(value, null, space));
    }
  };

  useEffect(() => {
    if (!primsAlreadyCalled) {
      Prism.highlightAll();
      setPrimsAlreadyCalled(true);
    }
    parseJson(jsonValue);
  }, [space, jsonValue]);

  const onTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      setJsonValue(JSON.parse(event.target.value));
      parseJson(jsonValue);
    } catch (error) {
      setJsonValue(null);
      if (event.target.value) {
        setJsonParsed(error.message);
      } else {
        setJsonParsed('');
      }
    }
  };

  const onSelectChange = (value: string) => {
    setSpace(parseInt(value, 10));
    parseJson(jsonValue);
  };

  // eslint-disable-next-line class-methods-use-this
  const prettyJSON = (value: string | undefined): any | void => {
    if (value) {
      return {
        __html: Prism.highlight(value, Prism.languages.json, 'json'),
      };
    }
    return undefined;
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
        <Select
          defaultValue="2"
          style={{ width: 120, paddingRight: '5px' }}
          onChange={onSelectChange}
        >
          <Option value="2">2 {t('commons.selects.spaces')}</Option>
          <Option value="4">4 {t('commons.selects.spaces')}</Option>
          <Option value="6">6 {t('commons.selects.spaces')}</Option>
        </Select>
        <Button icon={<CopyOutlined />} onClick={() => Copy(jsonParsed)}>
          {t('commons.buttons.copy')}
        </Button>
        <CodeView code={prettyJSON(jsonParsed)} language="json" />
      </Col>
    </Row>
  );
};

export default withTranslation()(JSONFormatterValidator);
