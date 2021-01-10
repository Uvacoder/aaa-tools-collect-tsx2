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
      expanded: ['1'],
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
    const { oldValue, newValue, expanded } = this.state;
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
                    First Source
                    <TextArea rows={10} onChange={this.onTextAreaOldChange} />
                  </Col>
                  <Col span={12}>
                    Second Source
                    <TextArea rows={10} onChange={this.onTextAreaNewChange} />
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
  }
}

export default Diffviewer;
