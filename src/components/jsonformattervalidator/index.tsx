import React from 'react';
import { Input, Row, Col, Select, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { clipboard } from 'electron';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';

const { TextArea } = Input;
const { Option } = Select;

class JSONFormatterValidator extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      jsonValue: null,
      jsonParsed: '',
      space: 2,
    };

    this.onTextAreaChange = this.onTextAreaChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.Copy = this.Copy.bind(this);
    this.parseJson = this.parseJson.bind(this);
  }

  componentDidMount() {
    Prism.highlightAll();
  }

  onTextAreaChange(event: any) {
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
    const jsonParsed = JSON.stringify(value, null, space);

    this.setState({
      jsonParsed,
    });
  }

  Copy(event) {
    if (this.state.jsonParsed) {
      clipboard.writeText(this.state.jsonParsed);
    }
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  prettyJSON(value) {
    return {
      __html: Prism.highlight(value, Prism.languages.json, 'json'),
    };
  }

  render() {
    const { jsonParsed } = this.state;
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
            <Option value="2">2 spaces</Option>
            <Option value="4">4 spaces</Option>
            <Option value="6">6 spaces</Option>
          </Select>
          <Button icon={<CopyOutlined />} onClick={this.Copy}>
            Copy
          </Button>
          <pre
            style={{ border: '1px solid' }}
            className="language-json pre-response"
            dangerouslySetInnerHTML={this.prettyJSON(jsonParsed)}
          />
        </Col>
      </Row>
    );
  }
}

export default JSONFormatterValidator;
