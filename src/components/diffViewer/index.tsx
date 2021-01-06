import React from 'react';
import { Input, Row, Col, Collapse } from 'antd';
import ReactDiffViewer from 'react-diff-viewer';

const { TextArea } = Input;
const { Panel } = Collapse;

class Diffviewer extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      oldValue: '',
      newValue: '',
    };

    this.onTextAreaOldChange = this.onTextAreaOldChange.bind(this);
    this.onTextAreaNewChange = this.onTextAreaNewChange.bind(this);
  }

  componentDidMount() {}

  onTextAreaOldChange(event: any) {
    this.setState({
      oldValue: event.target.value,
    });
  }

  onTextAreaNewChange(event: any) {
    this.setState({
      newValue: event.target.value,
    });
  }

  render() {
    const { oldValue, newValue } = this.state;
    return (
      <Row style={{ overflowY: 'auto', maxHeight: '530px' }}>
        <Col span={24} style={{ marginBottom: '5px' }}>
          <Collapse defaultActiveKey={['1']}>
            <Panel header="Source" key="1">
              <Row>
                <Col span={12}>
                  First Source
                  <TextArea rows={10} onChange={this.onTextAreaOldChange} />
                </Col>
                <Col span={11} offset={1}>
                  Second Source
                  <TextArea rows={10} onChange={this.onTextAreaNewChange} />
                </Col>
              </Row>
            </Panel>
          </Collapse>
        </Col>
        <ReactDiffViewer oldValue={oldValue} newValue={newValue} splitView />
      </Row>
    );
  }
}

export default Diffviewer;
