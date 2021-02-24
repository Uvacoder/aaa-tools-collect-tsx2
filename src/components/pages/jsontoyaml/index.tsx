import React, { useEffect, useState } from 'react';
import { Input, Row, Col, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import yml from 'js-yaml';
import Prism from 'prismjs';
import { withTranslation } from 'react-i18next';
import CodeView from '../../commons/codeView';
import Copy from '../../../utils/copy';

const { TextArea } = Input;

interface Props {
  t(code: string): string;
}

const JSONtoYaml = ({ t }: Props) => {
  const [yaml, setYaml] = useState<string | undefined>('');

  const parseYaml = (value: string | undefined) => {
    const yamlResult = yml.dump(value).toString();
    setYaml(yamlResult);
  };

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const onTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const yamlValue = JSON.parse(event.target.value);
      parseYaml(yamlValue);
    } catch (error) {
      setYaml('');
    }
  };

  // eslint-disable-next-line class-methods-use-this
  const prettyYAML = (value: string | undefined) => {
    if (value) {
      return {
        __html: Prism.highlight(value, Prism.languages.yaml, 'yaml'),
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
        <Button icon={<CopyOutlined />} onClick={() => Copy(yaml)}>
          {t('commons.buttons.copy')}
        </Button>
        <CodeView code={prettyYAML(yaml)} language="yaml" />
      </Col>
    </Row>
  );
};

export default withTranslation()(JSONtoYaml);
