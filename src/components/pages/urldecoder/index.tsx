import React from 'react';
import { Input, Row, Col, Select, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { withTranslation } from 'react-i18next';
import URL, { UrlWithParsedQuery } from 'url';
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
  dataDecode: string | undefined;
  data: string | undefined | UrlWithParsedQuery;
}

class URLEncoder extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      space: 2,
      dataDecode: '',
      data: undefined,
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
          data: undefined,
          dataDecode: error.message,
        });
      } else {
        this.setState({
          data: undefined,
          dataDecode: '',
        });
      }
    }
  }

  onSelectChange(value: string) {
    this.setState((state, prop) => {
      const space = parseInt(value, 10);

      if (state.data) {
        this.parseJson(state.data, space);
      }

      return { space };
    });
  }

  parseJson(value: string | UrlWithParsedQuery, space: number) {
    const dataDecode = JSON.stringify(value, null, space);

    this.setState({
      dataDecode,
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
    const { dataDecode } = this.state;
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
