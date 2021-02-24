import React, { useState } from 'react';
import { Input, Row, Col, Collapse } from 'antd';
import ReactDiffViewer from 'react-diff-viewer';

const { TextArea } = Input;
const { Panel } = Collapse;

const Diffviewer = () => {
  const [oldValue, setOldValue] = useState<string | undefined>('');
  const [newValue, setNewValue] = useState<string | undefined>('');
  const [expanded, setExpanded] = useState<string[] | string>(['1']);

  const onTextAreaOldChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setOldValue(event.target.value);
  };

  const onTextAreaNewChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewValue(event.target.value);
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
                  First Source
                  <TextArea rows={10} onChange={onTextAreaOldChange} />
                </Col>
                <Col span={12}>
                  Second Source
                  <TextArea rows={10} onChange={onTextAreaNewChange} />
                </Col>
              </Row>
            </Panel>
          </Collapse>
        </Col>
      </Row>
      <Row
        style={{
          overflowY: 'auto',
          ...(expanded.length > 0
            ? { maxHeight: '65%' }
            : { maxHeight: '93%' }),
        }}
      >
        <ReactDiffViewer oldValue={oldValue} newValue={newValue} splitView />
      </Row>
    </>
  );
};

export default Diffviewer;
