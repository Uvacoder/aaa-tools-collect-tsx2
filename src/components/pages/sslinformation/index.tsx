import React from 'react';
import { Input, Row, Col, Space, Popover } from 'antd';
import { certManager } from 'ssl-information';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

const { TextArea } = Input;

interface Props {
  t(code: string): string;
}

interface State {
  host: string | undefined;
  certificate:
    | {
        subject: any;
        issuer: any;
        subjectaltname: string | undefined;
        infoAccess: string[] | undefined;
        modulus: string | undefined;
        exponent: string | undefined;
        valid_from: string | undefined;
        valid_to: string | undefined;
        fingerprint: string | undefined;
        fingerprint256: string | undefined;
        ext_key_usage: string[] | undefined;
        serialNumber: string | undefined;
        raw: Buffer | undefined;
        isValid: boolean | undefined;
        content: string | undefined;
      }
    | undefined;
}

class SSLInformation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      host: '',
      certificate: {
        subject: undefined,
        issuer: undefined,
        subjectaltname: undefined,
        infoAccess: undefined,
        modulus: undefined,
        exponent: undefined,
        valid_from: undefined,
        valid_to: undefined,
        fingerprint: undefined,
        fingerprint256: undefined,
        ext_key_usage: undefined,
        serialNumber: undefined,
        raw: undefined,
        isValid: undefined,
        content: undefined,
      },
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {}

  onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value && this.checkDomain(event.target.value)) {
      this.setState((state, props) => {
        certManager
          .get({
            host: event.target.value,
          })
          // eslint-disable-next-line promise/always-return
          .then((response) => {
            this.setState({
              certificate: response,
            });
          })
          .catch((error) => {
            this.setState({
              certificate: undefined,
            });
          });
        return {
          host: event.target.value,
        };
      });
    } else {
      this.setState({
        host: '',
        certificate: undefined,
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  checkDomain(value: string) {
    return /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(
      value
    );
  }

  render() {
    const { certificate, host } = this.state;

    return (
      <Row style={{ padding: '15px' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <h2> SSL Information</h2>
          <Space size="small">
            <Input onChange={this.onInputChange} />

            {certificate && certificate.isValid ? (
              <Popover
                placement="right"
                content={`Valid Certificate for ${host}`}
                trigger="hover"
              >
                <CheckCircleTwoTone
                  twoToneColor="#52c41a"
                  style={{ fontSize: '25px' }}
                />
              </Popover>
            ) : (
              <Popover
                placement="right"
                content={`Invalid Certificate for ${host}`}
                trigger="hover"
              >
                <CloseCircleTwoTone
                  twoToneColor="#eb4034"
                  style={{ fontSize: '25px' }}
                />
              </Popover>
            )}
          </Space>
          <br />
          <br />
          <h3>Information</h3>
          <code>
            Valid for:{' '}
            {certificate && certificate.subjectaltname
              ? certificate.subjectaltname
                  .replace(/DNS:/g, '')
                  .split(',')
                  .join(', ')
              : ''}
            <br />
            <br />
            Expiration date:{' '}
            {certificate && certificate.valid_to ? certificate.valid_to : null}
          </code>
          <br />
          <br />
          <h3>Content</h3>
          <TextArea rows={4} value={certificate && certificate.content} />
        </Col>
      </Row>
    );
  }
}

export default SSLInformation;
