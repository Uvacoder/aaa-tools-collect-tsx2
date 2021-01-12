import React from 'react';
import { Input, Row, Col, Select, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { withTranslation } from 'react-i18next';
import URL from 'url';
import Prism from 'prismjs';
import Copy from '../../../utils/copy';
import CodeView from '../../commons/codeView';

const { TextArea } = Input;
const { Option } = Select;

class URLEncoder extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      space: 2,
      dataDecode: '',
      data: null,
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

  // eslint-disable-next-line class-methods-use-this
  prettyJSON(value) {
    return {
      __html: Prism.highlight(value, Prism.languages.json, 'json'),
    };
  }

  render() {
    const { dataDecode } = this.state;
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
          <Button icon={<CopyOutlined />} onClick={() => Copy(dataDecode)}>
            {t('commons.buttons.copy')}
          </Button>
          <CodeView code={this.prettyJSON(dataDecode)} language="json" />
        </Col>
      </Row>
    );
  }
}

export default withTranslation()(URLEncoder);
