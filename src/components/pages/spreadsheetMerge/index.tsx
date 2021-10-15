/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import { Button, Row, Col, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { withTranslation } from 'react-i18next';
import XLSX from 'xlsx';
import {
  RcCustomRequestOptions,
  UploadChangeParam,
} from 'antd/lib/upload/interface';
import SaveFileExcel from '../../../utils/saveFileExcel';

const { Dragger } = Upload;

interface Props {
  t(i: string): string | undefined;
}

const SpreadSheetComparison = ({ t }: Props) => {
  const [files, setFiles] = useState<any>(null);
  const [disableMerge, setDisableMerge] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFilesMerge = (combineData: unknown[]) => {
    const newWB = XLSX.utils.book_new();
    const newWS = XLSX.utils.json_to_sheet(combineData);

    XLSX.utils.book_append_sheet(newWB, newWS);

    SaveFileExcel(newWB, 'DataMerged.xlsx', {
      Props: { Author: 'Developer Toolbox' },
    });

    setLoading(false);
  };

  const handleFilesInput = () => {
    setLoading(true);
    let combineData: unknown[] = [];

    const promises = files.map(
      ({ originFileObj }: { originFileObj: { path: string } }) => {
        return new Promise((resolve) => {
          const workbook = XLSX.readFile(originFileObj.path, {
            cellDates: true,
            cellStyles: true,
          });

          for (const sheetName of workbook.SheetNames) {
            const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

            resolve(data);
          }
        });
      }
    );

    Promise.allSettled(promises)
      .then((res) => {
        for (const data of res) {
          combineData = combineData.concat(data.value);
        }
        handleFilesMerge(combineData);
        return undefined;
      })
      .catch((e) => console.error(e));
  };

  const handleFiles = (info: UploadChangeParam<any>) => {
    setFiles(info.fileList);

    if (info.fileList.length > 1) {
      setDisableMerge(false);
    } else {
      setDisableMerge(true);
    }
  };

  const dummyRequest = (options: RcCustomRequestOptions) => {
    setTimeout(() => {
      options.onSuccess({ status: 'done' }, options.file);
    }, 0);
  };

  return (
    <>
      <Row>
        <Col span={24} style={{ marginBottom: '5px' }}>
          <Dragger
            accept=".xls,xlsx"
            name="files"
            showUploadList
            onChange={handleFiles}
            customRequest={dummyRequest}
            multiple
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Dragger>

          <br />
          <Row>
            <Col span={12} offset={10}>
              <Button
                onClick={handleFilesInput}
                disabled={disableMerge}
                type="primary"
                loading={loading}
              >
                {t('pages.spreadsheetmerge.merge')}
              </Button>
            </Col>
          </Row>
          <br />
        </Col>
      </Row>
    </>
  );
};

export default withTranslation()(SpreadSheetComparison);
