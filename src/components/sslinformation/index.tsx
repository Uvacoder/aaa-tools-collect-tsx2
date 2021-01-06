import React from 'react';
import { Input, Row, Col, Space, Popover } from 'antd';
import { certManager } from 'ssl-information';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

const { TextArea } = Input;

class SSLInformation extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      host: '',
      certificate: {
        subjectaltname: '',
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
              certificate: {},
            });
          });
        return {
          host: event.target.value,
        };
      });
    } else {
      this.setState({
        host: '',
        certificate: {},
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

            {certificate.isValid ? (
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
            {certificate.subjectaltname
              ? certificate.subjectaltname
                  .replace(/DNS:/g, '')
                  .split(',')
                  .join(', ')
              : ''}
            <br />
            <br />
            Expiration date:{' '}
            {certificate.valid_to ? certificate.valid_to : null}
          </code>
          <br />
          <br />
          <h3>Content</h3>
          <TextArea rows={4} value={certificate.content} />
        </Col>
      </Row>
    );
  }
}

export default SSLInformation;
