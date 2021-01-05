import React from 'react';
import { Input, Row, Col, Select, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { clipboard } from 'electron';
import yml from 'js-yaml';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';

const { TextArea } = Input;
const { Option } = Select;

class JSONtoYaml extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      json: '',
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
      const json = yml.load(event.target.value);
      console.log(json);
      if (json) {
        this.parseJson(json, this.state.space);
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
      <Row style={{ padding: '15px' }}>
        <Col span={12}>
          <TextArea rows={23} onChange={this.onTextAreaChange} />
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
            style={{ border: '1px solid', height: '91%', maxHeight: '478px' }}
            className="language-yaml"
            dangerouslySetInnerHTML={this.prettyJSON(jsonParsed)}
          />
        </Col>
      </Row>
    );
  }
}

export default JSONtoYaml;
