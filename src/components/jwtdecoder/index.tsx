import React from 'react';
import { Input, Row, Col, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import * as jwt from 'jsonwebtoken';
import { clipboard } from 'electron';
import PrettyJson from '../../helpers/prettyJson';

const { TextArea } = Input;

class JWTDecoder extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      headers: '',
      payload: '',
    };

    this.onTextAreaChange = this.onTextAreaChange.bind(this);
    this.Copy = this.Copy.bind(this);
  }

  componentDidMount() {}

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
  Copy(event: any) {
    const dataShown = event.target.parentNode.getAttribute('data-shown');
    let dataToCopy = '';
    if (dataShown) {
      const { payload, headers } = this.state;
      switch (dataShown) {
        case 'headers':
          dataToCopy = headers;
          break;
        case 'payload':
          dataToCopy = payload;
          break;
        default:
          break;
      }
      clipboard.writeText(dataToCopy);
    }
  }

  render() {
    const { payload, headers } = this.state;

    return (
      <Row style={{ padding: '15px' }}>
        <Col span={12}>
          <TextArea rows={23} onChange={this.onTextAreaChange} />
        </Col>
        <Col span={11} offset={1}>
          <h4>
            Headers{' '}
            <Button
              data-shown="headers"
              icon={<CopyOutlined />}
              onClick={this.Copy}
            >
              Copy
            </Button>
          </h4>

          <pre
            style={{ border: '1px solid', height: '41%', padding: '5px' }}
            dangerouslySetInnerHTML={PrettyJson(headers)}
          />
          <h4>
            Payload{' '}
            <Button
              data-shown="payload"
              icon={<CopyOutlined />}
              onClick={this.Copy}
            >
              Copy
            </Button>
          </h4>

          <pre
            style={{ border: '1px solid', height: '41%', padding: '5px' }}
            dangerouslySetInnerHTML={PrettyJson(payload)}
          />
        </Col>
      </Row>
    );
  }
}

export default JWTDecoder;
