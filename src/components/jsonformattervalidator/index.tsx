import React from 'react';
import { Input, Row, Col, Select, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { clipboard } from 'electron';

const { TextArea } = Input;
const { Option } = Select;

class JSONFormatterValidator extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      jsonValue: null,
      jsonParsed: null,
      space: 2,
    };

    this.onTextAreaChange = this.onTextAreaChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.Copy = this.Copy.bind(this);
    this.parseJson = this.parseJson.bind(this);
  }

  componentDidMount() {}

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
          jsonParsed: null,
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

  prettyJson() {
    const { jsonParsed } = this.state;

    if (jsonParsed) {
      const json = jsonParsed
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      return {
        __html: json.replace(
          /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
          function (match) {
            let cls = 'number';
            if (/^"/.test(match)) {
              if (/:$/.test(match)) {
                cls = 'key';
              } else {
                cls = 'string';
              }
            } else if (/true|false/.test(match)) {
              cls = 'boolean';
            } else if (/null/.test(match)) {
              cls = 'null';
            }
            return `<span class="${cls}">${match}</span>`;
          }
        ),
      };
    }
  }

  render() {
    return (
      <Row style={{ padding: '15px' }}>
        <Col span={12}>
          <TextArea rows={26} onChange={this.onTextAreaChange} />
        </Col>
        <Col span={11} offset={1}>
          <Select
            defaultValue="2"
            style={{ width: 120, paddingBottom: '10px', paddingRight: '5px' }}
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
            style={{ border: '1px solid', height: '93%', padding: '5px' }}
            dangerouslySetInnerHTML={this.prettyJson()}
          />
        </Col>
      </Row>
    );
  }
}

export default JSONFormatterValidator;
