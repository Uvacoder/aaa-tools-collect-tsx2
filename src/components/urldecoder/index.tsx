import React from 'react';
import { Input, Row, Col, Select, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { clipboard } from 'electron';
import URL from 'url';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';

const { TextArea } = Input;
const { Option } = Select;

class JSONFormatterValidator extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      space: 2,
      dataDecode: '',
      data: null,
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
      const data = URL.parse(event.target.value, true);

      this.setState((state, props) => {
        this.parseJson(data, state.space);

        return {
          data,
        };
      });
    } catch (error) {
      if (event.target.value) {
        this.setState({
          data: null,
          dataDecode: error.message,
        });
      } else {
        this.setState({
          data: null,
          dataDecode: '',
        });
      }
    }
  }

  onSelectChange(value: string) {
    this.setState((state, prop) => {
      const space = parseInt(value, 10);

      this.parseJson(state.data, space);

      return { space };
    });
  }

  parseJson(value: string, space: number) {
    const dataDecode = JSON.stringify(value, null, space);

    this.setState({
      dataDecode,
    });
  }

  Copy(event) {
    if (this.state.dataDecode) {
      clipboard.writeText(this.state.dataDecode);
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
    const { dataDecode } = this.state;
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
            className="language-json"
            dangerouslySetInnerHTML={this.prettyJSON(dataDecode)}
          />
        </Col>
      </Row>
    );
  }
}

export default JSONFormatterValidator;
