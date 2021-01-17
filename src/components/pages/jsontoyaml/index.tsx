import React from 'react';
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
interface State {
  yaml: string | undefined;
}

class JSONtoYaml extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      yaml: '',
    };

    this.onTextAreaChange = this.onTextAreaChange.bind(this);
    this.parseJson = this.parseJson.bind(this);
  }

  componentDidMount() {
    Prism.highlightAll();
  }

  onTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    try {
      const jsonValue = JSON.parse(event.target.value);
      this.parseJson(jsonValue);
    } catch (error) {
      this.setState({
        yaml: '',
      });
    }
  }

  parseJson(value: string) {
    const yaml = yml.dump(value).toString();

    this.setState({
      yaml: `${yaml}`,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  prettyYAML(value: string | undefined) {
    if (value) {
      return {
        __html: Prism.highlight(value, Prism.languages.yaml, 'yaml'),
      };
    }

    return undefined;
  }

  render() {
    const { yaml } = this.state;

    const { t } = this.props;
    return (
      <Row style={{ padding: '15px', height: '100%' }}>
        <Col span={12}>
          <TextArea
            rows={23}
            onChange={this.onTextAreaChange}
            className="textarea-input"
          />
        </Col>
        <Col span={11} offset={1}>
          <Button icon={<CopyOutlined />} onClick={() => Copy(yaml)}>
            {t('commons.buttons.copy')}
          </Button>
          <CodeView code={this.prettyYAML(yaml)} language="yaml" />
        </Col>
      </Row>
    );
  }
}

export default withTranslation()(JSONtoYaml);
