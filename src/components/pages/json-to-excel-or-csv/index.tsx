import React, { useState } from 'react';
import { json2csv } from 'json-2-csv';
import fs from 'fs-extra';
import { Input, Row, Col, Upload, Button } from 'antd';
import { withTranslation } from 'react-i18next';
import { UploadOutlined, ExportOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/lib/upload/interface';
import SaveFile from '../../../utils/saveFile';

const { TextArea } = Input;

interface Props {
  t(code: string): string;
}

const JSONToExcelOrCSV = ({ t }: Props) => {
  const [jsonValue, setJsonValue] = useState<any>(null);

  const handleConvert = () => {
    json2csv(jsonValue, (err, csv) => {
      if (err) {
        console.error(err);
      }

      SaveFile(csv, 'export.csv', 'utf-8');
    });
  };

  const handleDelete = (file: UploadFile<any>) => {
    setJsonValue(null);
    return true;
  };

  const onTextAreaOldChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    try {
      const json = JSON.parse(event.target.value);
      setJsonValue(json);
    } catch (error) {
      setJsonValue(null);
    }
  };

  const handleFile = (file: RcFile) => {
    try {
      const fileValue = fs.readFileSync(file.path, { encoding: 'utf-8' });
      const json = JSON.parse(fileValue);
      setJsonValue(json);
    } catch (error) {
      setJsonValue(null);
    }
    return file.name;
  };

  const dummyRequest = (options: any) => {
    setTimeout(() => {
      options.onSuccess({ status: 'done' }, options.file);
    }, 0);
  };

  return (
    <>
      <Row>
        <Col span={12} style={{ marginBottom: '5px' }}>
          Source
          <TextArea rows={10} onChange={onTextAreaOldChange} />
        </Col>
        <Col span={11} offset={1} style={{ marginBottom: '5px' }}>
          Upload
          <br />
          <Upload
            accept="application/json, text/json"
            name="file1"
            action={handleFile}
            customRequest={dummyRequest}
            onRemove={handleDelete}
          >
            <Button icon={<UploadOutlined />}>
              {t('commons.uploads.file')}
            </Button>
          </Upload>
        </Col>
      </Row>
      <Row>
        <Col offset={11}>
          <Button
            icon={<ExportOutlined />}
            onClick={handleConvert}
            disabled={!jsonValue}
          >
            {t('commons.export')}
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default withTranslation()(JSONToExcelOrCSV);
