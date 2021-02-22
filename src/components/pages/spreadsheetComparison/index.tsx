/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import { Button, Row, Col, Collapse, Upload, Table } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { withTranslation } from 'react-i18next';
import { RcFile } from 'antd/lib/upload';
import XLSX from 'xlsx';
import { RcCustomRequestOptions, UploadFile } from 'antd/lib/upload/interface';
import compare from './utils/checkDiference';

const { Panel } = Collapse;

interface Props {
  t(i: string): string | undefined;
}

const SpreadSheetComparison = ({ t }: Props) => {
  const [file1, setFile1] = useState<any>(null);
  const [file1Name, setFile1Name] = useState<string>('');
  const [file2, setFile2] = useState<any>(null);
  const [file2Name, setFile2Name] = useState<string>('');
  const [expanded, setExpanded] = useState<string[] | string>(['1']);
  const [comparision, setComparision] = useState<any>({});
  const [disableCompare, setDisableCompare] = useState<boolean>(true);

  const transpose = (m: any) =>
    m[0].map((x: any, i: number) => m.map((j: any) => j[i]));

  const compareFiles = () => {
    const sheetsData: any = {};
    for (const sheet of Object.keys(file1)) {
      const sheetData: any = [];
      const currentSheetFileOne = file1[sheet];
      const currentSheetFileTwo = file2[sheet];

      let arrayValueFileOne = 0;
      let arrayValueFileTwo = 0;

      for (const [i, letterValue] of Object.keys(
        currentSheetFileOne
      ).entries()) {
        if (i === 0) {
          arrayValueFileOne = i;
          arrayValueFileTwo = i + 1;
        } else {
          arrayValueFileOne = arrayValueFileTwo + 1;
          arrayValueFileTwo = arrayValueFileOne + 1;
        }

        sheetData[arrayValueFileOne] = [letterValue];
        sheetData[arrayValueFileTwo] = [letterValue];

        for (const numberValue of Object.keys(
          currentSheetFileOne[letterValue]
        )) {
          sheetData[arrayValueFileOne].push(
            currentSheetFileOne[letterValue][numberValue]
          );

          let dataToPushSheetTwo;
          if (currentSheetFileTwo && currentSheetFileTwo[letterValue]) {
            dataToPushSheetTwo = currentSheetFileTwo[letterValue][numberValue];
          } else {
            dataToPushSheetTwo = undefined;
          }

          sheetData[arrayValueFileTwo].push(dataToPushSheetTwo);
        }
      }

      const sheetDataTransposed: Array<string[]> = transpose(sheetData);

      const columns: any = sheetDataTransposed[0].map(
        // eslint-disable-next-line @typescript-eslint/no-loop-func
        (letter: string, index: number) => {
          return {
            title: letter,
            dataIndex: `key-${index}`,
            render(value: string, record: any) {
              return {
                props: {
                  style: {
                    background: index % 2 === 0 ? '#ffffff' : '#e6e6e6',
                    color: record.differences.includes(value) ? 'red' : 'black',
                  },
                },
                children: <div>{value}</div>,
              };
            },
          };
        }
      );

      columns.unshift({ title: '', dataIndex: 'index' });

      const sheetDataToCompare = sheetDataTransposed.slice(1);

      const data = sheetDataToCompare.map((value, index) => {
        const returnvalue = value.map((info, index2) => {
          let difference;

          if (index2 % 2 === 1) {
            difference = compare(value[index2 - 1], value[index2])
              ? null
              : info;
          } else {
            difference = compare(value[index2 + 1], value[index2])
              ? null
              : info;
          }
          return {
            index: index + 1,
            [`key-${index2}`]: info,
            difference,
          };
        });

        const differences = returnvalue.map(
          (rowInfo: {
            [x: string]: string | number | null;
            index: number;
            difference: string | null;
          }) => {
            return rowInfo.difference;
          }
        );

        const rowObject = Object.assign({}, ...returnvalue);
        delete rowObject.difference;
        const objectReturned = Object.assign(rowObject, { differences });
        return objectReturned;
      });

      // eslint-disable-next-line prefer-spread
      const dataOfTheSheet = [].concat.apply([], data);

      sheetsData[sheet] = {
        columns,
        data: dataOfTheSheet,
      };
    }

    return sheetsData;
  };

  const handleFiles = (sheets: any) => {
    const sheetsNames: string[] = Object.keys(sheets);
    const sheetsData: any = {};

    for (const sheet of sheetsNames) {
      const sheetData: any = {};
      const columnNames: string[] = Object.keys(sheets[sheet])
        .filter((column) => !['!ref', '!margins', '!merges'].includes(column))
        .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));

      for (const columnName of columnNames) {
        const numberValue: string | undefined = columnName
          .match(/\d/g)
          ?.join('');
        const textValue: string | undefined = columnName.match(/\D/g)?.join('');

        if (textValue && numberValue) {
          if (Object.keys(sheetData).includes(textValue)) {
            sheetData[textValue].push(parseInt(numberValue, 10));
          } else {
            sheetData[textValue] = [parseInt(numberValue, 10)];
          }
        }
      }

      const maxNumbers: number[] = [];

      for (const letterValue of Object.keys(sheetData)) {
        const letterArray: number[] = sheetData[letterValue];
        const maxNumber: number = Math.max(...letterArray);

        maxNumbers.push(maxNumber);
      }

      const maxNumberFromAllLetters = Math.max(...maxNumbers);

      const array = Array.from(
        { length: maxNumberFromAllLetters },
        (_, i) => i + 1
      );

      for (const letterValue of Object.keys(sheetData)) {
        sheetData[letterValue] = {};
        array.forEach((number) => {
          sheetData[letterValue][number] = undefined;
        });
      }

      for (const letterValue of Object.keys(sheetData)) {
        for (const numberValue of Object.keys(sheetData[letterValue])) {
          if (sheets[sheet][`${letterValue}${numberValue}`] !== undefined) {
            sheetData[letterValue][numberValue] =
              sheets[sheet][`${letterValue}${numberValue}`].w;
          }
        }
      }

      sheetsData[sheet] = sheetData;
    }

    return sheetsData;
  };

  const handleFileOne = (file: RcFile) => {
    const workbook = XLSX.readFile(file.path);
    setFile1Name(file.name);
    setFile1(handleFiles(workbook.Sheets));
    if (file2 !== null && file2 !== undefined) {
      setDisableCompare(false);
    } else {
      setDisableCompare(true);
    }
    return file.uid;
  };

  const handleRemoveFileOne = (file: UploadFile<any>) => {
    setFile1(null);
    setDisableCompare(true);
    setComparision({});
    setFile1Name('');
    return true;
  };

  const handleFileTwo = (file: RcFile) => {
    const workbook = XLSX.readFile(file.path);
    setFile2Name(file.name);
    setFile2(handleFiles(workbook.Sheets));
    if (file1 !== null && file1 !== undefined) {
      setDisableCompare(false);
    } else {
      setDisableCompare(true);
    }
    return file.uid;
  };

  const handleRemoveFileTwo = (file: UploadFile<any>) => {
    setFile2(null);
    setDisableCompare(true);
    setComparision({});
    setFile2Name('');
    return true;
  };

  const handleCompare = () => {
    setComparision(compareFiles());
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
          <Collapse
            defaultActiveKey={expanded}
            onChange={(value) => setExpanded(value)}
          >
            <Panel header="Source" key="1">
              <Row gutter={[16, 0]}>
                <Col span={12}>
                  <Upload
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    name="file1"
                    action={handleFileOne}
                    customRequest={dummyRequest}
                    onRemove={handleRemoveFileOne}
                  >
                    <Button icon={<UploadOutlined />}>
                      {t('pages.spreadsheetcomparison.uploads.file')}
                    </Button>
                  </Upload>
                </Col>
                <Col span={12}>
                  <Upload
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    name="file2"
                    action={handleFileTwo}
                    customRequest={dummyRequest}
                    onRemove={handleRemoveFileTwo}
                  >
                    <Button icon={<UploadOutlined />}>
                      {t('pages.spreadsheetcomparison.uploads.file')}
                    </Button>
                  </Upload>
                </Col>
              </Row>
              <br />
              <Row>
                <Col span={12} offset={6}>
                  <Button
                    onClick={handleCompare}
                    disabled={disableCompare}
                    type="primary"
                  >
                    {t('pages.spreadsheetcomparison.compare')}
                  </Button>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>{t('pages.spreadsheetcomparison.limitation')}</Col>
              </Row>
            </Panel>
          </Collapse>
        </Col>
      </Row>

      <Row>
        <Col span={24} style={{ marginBottom: '5px' }}>
          {Object.keys(comparision).map((sheet, i) => (
            <>
              <p style={{ display: 'flex' }}>
                <b>{sheet}</b> <div className="file-one" /> {file1Name}
                <div className="file-two" /> {file2Name}
              </p>
              <Table
                key={`table-${sheet}`}
                columns={comparision[sheet].columns}
                dataSource={comparision[sheet].data}
                pagination={{ pageSize: 1000 }}
                scroll={{ y: 400 }}
                bordered
                size="middle"
              />
            </>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default withTranslation()(SpreadSheetComparison);
