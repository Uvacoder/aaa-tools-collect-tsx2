import React from 'react';
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
interface State {
  space: number;
  jsonValue: any;
  jsonParsed: string | undefined;
}

class JSONFormatterValidator extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      jsonValue: null,
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

  onTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    try {
      const jsonValue = JSON.parse(event.target.value);

      this.setState((state, props) => {
        this.parseJson(jsonValue, state.space);

        return {
          jsonValue,
        };
      });
    } catch (error) {
      if (event.target.value) {
        this.setState({
          jsonValue: null,
          jsonParsed: error.message,
        });
      } else {
        this.setState({
          jsonValue: null,
          jsonParsed: '',
        });
      }
    }
  }

  onSelectChange(value: string) {
    this.setState((state, prop) => {
      const space = parseInt(value, 10);

      this.parseJson(state.jsonValue, space);

      return { space };
    });
  }

  parseJson(value: string, space: number) {
    if (value) {
      const jsonParsed = JSON.stringify(value, null, space);

      this.setState({
        jsonParsed,
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  prettyJSON(value: string | undefined): any | void {
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
            rows={23}
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

export default withTranslation()(JSONFormatterValidator);
