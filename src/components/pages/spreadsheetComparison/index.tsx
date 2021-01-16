import React from 'react';
import { Button, Row, Col, Collapse, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { withTranslation } from 'react-i18next';
import { RcFile } from 'antd/lib/upload';
import XLSX from 'xlsx';

const { Panel } = Collapse;

class SpreadSheetComparison extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      file1: {},
      file2: {},
      expanded: ['1'],
    };

    this.handleFileOne = this.handleFileOne.bind(this);
  }

  componentDidMount() {}

  // eslint-disable-next-line class-methods-use-this
  handleFileOne(file: RcFile) {
    const workbook = XLSX.readFile(file.path);
    console.log(workbook);
  }

  render() {
    const { file1, file2, expanded } = this.state;
    // eslint-disable-next-line react/prop-types
    const { t } = this.props;

    return (
      <>
        <Row>
          <Col span={24} style={{ marginBottom: '5px' }}>
            <Collapse
              defaultActiveKey={expanded}
              onChange={(value) => this.setState({ expanded: value })}
            >
              <Panel header="Source" key="1">
                <Row gutter={[16, 0]}>
                  <Col span={12}>
                    <Upload
                      name="file1"
                      action={this.handleFileOne}
                      customRequest={(options) => {
                        // eslint-disable-next-line promise/param-names
                        return new Promise((resolve, rejects) => {
                          resolve({ status: 'done' });
                        });
                      }}
                    >
                      <Button icon={<UploadOutlined />}>
                        {t('pages.spreadsheetcomparison.uploads.file')}
                      </Button>
                    </Upload>
                  </Col>
                  <Col span={12}>
                    <Upload>
                      <Button icon={<UploadOutlined />}>
                        {t('pages.spreadsheetcomparison.uploads.file')}
                      </Button>
                    </Upload>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
          </Col>
        </Row>
      </>
    );
  }
}

export default withTranslation()(SpreadSheetComparison);
