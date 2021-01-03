import React from 'react';
import { InputNumber, Row, Col } from 'antd';

class UnixTimeConverter extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      date: 915148798.75,
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {}

  onInputChange(value: string | number | undefined) {
    if (
      ![undefined, null].includes(value) &&
      ['string', 'number'].includes(typeof value)
    ) {
      this.setState({
        date: value,
      });
    }
  }

  render() {
    const { date } = this.state;
    return (
      <Row style={{ padding: '15px' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <h2> Unix Time Converter</h2>
          <InputNumber
            style={{ width: '50%' }}
            min={0}
            step={0.1}
            defaultValue={915148798.75}
            onChange={this.onInputChange}
          />
          <br />
          <br />
          <h3>Date</h3>
          <p>{new Date(date).toLocaleString()}</p>
        </Col>
      </Row>
    );
  }
}

export default UnixTimeConverter;
