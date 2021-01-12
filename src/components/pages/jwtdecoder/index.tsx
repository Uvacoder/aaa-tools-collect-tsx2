import React from 'react';
import { Input, Row, Col, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import * as jwt from 'jsonwebtoken';
import { withTranslation } from 'react-i18next';
import Prism from 'prismjs';
import Copy from '../../../utils/copy';
import 'prismjs/components/prism-json';

const { TextArea } = Input;

class JWTDecoder extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      headers: '',
      payload: '',
    };

    this.onTextAreaChange = this.onTextAreaChange.bind(this);
  }

  componentDidMount() {
    Prism.highlightAll();
  }

  onTextAreaChange(event: any) {
    try {
      const payloadDecode = jwt.decode(event.target.value, {
        json: true,
        complete: true,
      });
      if (payloadDecode) {
        const payload = JSON.stringify(payloadDecode.payload, null, 4);
        const headers = JSON.stringify(payloadDecode.header, null, 4);
        this.setState({
          payload,
          headers,
        });
      }
    } catch (error) {
      if (event.target.value) {
        this.setState({
          payload: error.message,
        });
      } else {
        this.setState({
          payload: '',
          headers: '',
        });
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  prettyJSON(value) {
    return {
      __html: Prism.highlight(value, Prism.languages.json, 'json'),
    };
  }

  render() {
    const { payload, headers } = this.state;
    // eslint-disable-next-line react/prop-types
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
          <h4>
            Headers{' '}
            <Button icon={<CopyOutlined />} onClick={() => Copy(headers)}>
              {' '}
              {t('commons.buttons.copy')}{' '}
            </Button>
          </h4>

          <pre
            style={{ border: '1px solid' }}
            className="language-json pre-response-50"
            dangerouslySetInnerHTML={this.prettyJSON(headers)}
          />
          <h4>
            Payload{' '}
            <Button icon={<CopyOutlined />} onClick={() => Copy(payload)}>
              {t('commons.buttons.copy')}
            </Button>
          </h4>

          <pre
            style={{ border: '1px solid' }}
            className="language-json pre-response-50"
            dangerouslySetInnerHTML={this.prettyJSON(payload)}
          />
        </Col>
      </Row>
    );
  }
}

export default withTranslation()(JWTDecoder);
