import React from 'react';
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

interface State {
  space: number;
  json: string | undefined;
  jsonParsed: string | undefined;
}

class JSONtoYaml extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      json: '',
      jsonParsed: '',
      space: 2,
    };

    this.onTextAreaChange = this.onTextAreaChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);

    this.parseJson = this.parseJson.bind(this);
  }

  componentDidMount() {
    Prism.highlightAll();
  }

  onTextAreaChange(event: any) {
    try {
      const json = yml.load(event.target.value);
      if (json) {
        const { space } = this.state;
        this.parseJson(json, space);
        this.setState({
          json,
        });
      } else {
        this.setState({
          jsonParsed: '',
          json: '',
        });
      }
    } catch (error) {
      this.setState({
        jsonParsed: '',
        json: '',
      });
    }
  }

  onSelectChange(value: string) {
    this.setState((state, prop) => {
      const space = parseInt(value, 10);

      this.parseJson(state.json, space);

      return { space };
    });
  }

  parseJson(value: string | undefined, space: number) {
    const jsonParsed = JSON.stringify(value, null, space);
    this.setState({
      jsonParsed,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  prettyJSON(value: string | undefined) {
    if (value) {
      return {
        __html: Prism.highlight(value, Prism.languages.json, 'json'),
      };
    }

    return undefined;
  }

  render() {
    const { jsonParsed } = this.state;
    const { t } = this.props;
    return (
      <Row style={{ padding: '15px', height: '100%' }}>
        <Col span={12}>
          <TextArea
            rows={29}
            onChange={this.onTextAreaChange}
            className="textarea-input"
          />
        </Col>
        <Col span={11} offset={1}>
          <Select
            defaultValue="2"
            style={{ width: 120, paddingRight: '5px' }}
            onChange={this.onSelectChange}
          >
            <Option value="2">2 {t('commons.selects.spaces')}</Option>
            <Option value="4">4 {t('commons.selects.spaces')}</Option>
            <Option value="6">6 {t('commons.selects.spaces')}</Option>
          </Select>
          <Button icon={<CopyOutlined />} onClick={() => Copy(jsonParsed)}>
            {t('commons.buttons.copy')}
          </Button>
          <CodeView code={this.prettyJSON(jsonParsed)} language="json" />
        </Col>
      </Row>
    );
  }
}

export default withTranslation()(JSONtoYaml);
