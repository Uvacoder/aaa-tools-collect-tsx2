/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import { Input, Row, Col, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import * as jwt from 'jsonwebtoken';
import { withTranslation } from 'react-i18next';
import Prism from 'prismjs';
import Copy from '../../../utils/copy';
import 'prismjs/components/prism-json';

const { TextArea } = Input;

interface Props {
  t(code: string): string;
}

const JWTDecoder = ({ t }: Props) => {
  const [headers, setHeaders] = useState<string | undefined>(undefined);
  const [payload, setPayload] = useState<string | undefined>(undefined);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const onTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const payloadDecode = jwt.decode(event.target.value, {
        json: true,
        complete: true,
      });
      if (payloadDecode) {
        setPayload(JSON.stringify(payloadDecode.payload, null, 4));
        setHeaders(JSON.stringify(payloadDecode.header, null, 4));
      }
    } catch (error) {
      if (event.target.value) {
        setPayload(error.message);
      } else {
        setPayload(undefined);
        setHeaders(undefined);
      }
    }
  };

  // eslint-disable-next-line class-methods-use-this
  const prettyJSON = (value: string | undefined) => {
    if (value) {
      return {
        __html: Prism.highlight(value, Prism.languages.json, 'json'),
      };
    }

    return undefined;
  };

  return (
    <Row style={{ padding: '15px', height: '100%' }}>
      <Col span={12}>
        <TextArea
          rows={23}
          onChange={onTextAreaChange}
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
          dangerouslySetInnerHTML={prettyJSON(headers)}
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
          dangerouslySetInnerHTML={prettyJSON(payload)}
        />
      </Col>
    </Row>
  );
};

export default withTranslation()(JWTDecoder);
