/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
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

const URLEncoder = ({ t }: Props) => {
  const [space, setSpace] = useState<number>(2);
  const [dataDecoded, setDataDecoded] = useState<string | undefined>('');
  const [data, setData] = useState<string | undefined | UrlWithParsedQuery>(
    undefined
  );
  const [prismLoaded, setPrismLoaded] = useState<boolean>(false);

  const parseJson = () => {
    const dataDecode = JSON.stringify(data, null, space);
    setDataDecoded(dataDecode);
  };

  useEffect(() => {
    if (prismLoaded) {
      Prism.highlightAll();
      setPrismLoaded(true);
    }
    parseJson();
  }, [data, space]);

  const onTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      setData(URL.parse(event.target.value, true));
    } catch (error) {
      setData(undefined);
      if (event.target.value) {
        setDataDecoded(error.message);
      } else {
        setDataDecoded(undefined);
      }
    }
  };

  const onSelectChange = (value: string) => {
    setSpace(parseInt(value, 10));
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
        <Select
          defaultValue="2"
          style={{ width: 120, paddingRight: '5px' }}
          onChange={onSelectChange}
        >
          <Option value="2">2 {t('commons.selects.spaces')}</Option>
          <Option value="4">4 {t('commons.selects.spaces')}</Option>
          <Option value="6">6 {t('commons.selects.spaces')}</Option>
        </Select>
        <Button icon={<CopyOutlined />} onClick={() => Copy(dataDecoded)}>
          {t('commons.buttons.copy')}
        </Button>
        <CodeView code={prettyJSON(dataDecoded)} language="json" />
      </Col>
    </Row>
  );
};

export default withTranslation()(URLEncoder);
