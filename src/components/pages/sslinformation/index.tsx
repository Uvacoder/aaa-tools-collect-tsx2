import React, { useEffect, useState } from 'react';
import { Input, Row, Col, Space, Popover } from 'antd';
import { certManager } from 'ssl-information';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

const { TextArea } = Input;

interface Props {
  t(code: string): string;
}

interface Certificate {
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

const SSLInformation = ({ t }: Props) => {
  const [host, setHost] = useState<string | undefined>('');
  const [certificate, setCertificate] = useState<Certificate | undefined>(
    undefined
  );

  useEffect(() => {
    if (host) {
      certManager
        .get({
          host,
        })
        // eslint-disable-next-line promise/always-return
        .then((response) => {
          setCertificate(response);
        })
        .catch(() => {
          setCertificate(undefined);
        });
    } else {
      setCertificate(undefined);
    }
  }, [host]);

  // eslint-disable-next-line class-methods-use-this
  const checkDomain = (value: string) => {
    return /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(
      value
    );
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value && checkDomain(event.target.value)) {
      setHost(event.target.value);
    } else {
      setHost(undefined);
    }
  };

  return (
    <Row style={{ padding: '15px' }}>
      <Col span={24} style={{ textAlign: 'center' }}>
        <h2> SSL Information</h2>
        <Space size="small">
          <Input onChange={onInputChange} />

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
};

export default SSLInformation;
