import React, { useEffect, useState } from 'react';
import { Input, Row, Col, Select, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { withTranslation } from 'react-i18next';
import yml from 'js-yaml';
import Prism from 'prismjs';
import Copy from '../../../utils/copy';
import CodeView from '../../commons/codeView';

const { TextArea } = Input;
const { Option } = Select;

interface Props {
  t(code: string): string;
}

const JSONtoYaml = ({ t }: Props) => {
  const [json, setJson] = useState<string | undefined>(undefined);
  const [jsonParsed, setJsonParsed] = useState<string | undefined>(undefined);
  const [space, setSpace] = useState<number>(2);
  const [prismLoaded, setPrismLoaded] = useState<boolean>(false);

  const parseJson = () => {
    setJsonParsed(JSON.stringify(json, null, space));
  };

  useEffect(() => {
    if (prismLoaded) {
      Prism.highlightAll();
      setPrismLoaded(true);
    }
    parseJson();
  }, [json, space]);

  const onTextAreaChange = (event: any) => {
    try {
      const jsonLoaded = yml.load(event.target.value);
      if (jsonLoaded) {
        setJson(jsonLoaded);
      } else {
        setJson(undefined);
        setJsonParsed(undefined);
      }
    } catch (error) {
      setJson(undefined);
      setJsonParsed(undefined);
    }
  };

  const onSelectChange = (value: string) => {
    setSpace(parseInt(value, 10));
  };

  // eslint-disable-next-line class-methods-use-this
  const prettyJSON = (value: string | undefined) => {
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
          rows={29}
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

export default withTranslation()(JSONtoYaml);
