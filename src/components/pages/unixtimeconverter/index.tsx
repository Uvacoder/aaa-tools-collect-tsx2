/* eslint-disable no-bitwise */
import React from 'react';
import { InputNumber, Row, Col, Switch } from 'antd';

class UnixTimeConverter extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      date: 915148798.75,
      dateParsed: '',
      format: 'utc',
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const { date, format } = this.state;
    this.setDate(date, format);
  }

  onInputChange(value: string | number | undefined) {
    if (
      ![undefined, null].includes(value) &&
      ['string', 'number'].includes(typeof value)
    ) {
      const { format } = this.state;
      this.setDate(value, format);
    }
  }

  onChange(value: boolean) {
    this.setState((state, prop) => {
      const format = value ? 'utc' : 'local';
      this.setDate(state.date, format);
      return {
        format,
      };
    });
  }

  setDate(value: any, format: string) {
    try {
      const date = new Date(value);
      let dateParsed = '';
      switch (format) {
        case 'local':
          dateParsed = this.toISOLocal(date);
          break;
        case 'utc':
          dateParsed = date.toISOString();
          break;
        default:
          break;
      }
      this.setState({
        date: value,
        dateParsed,
      });
    } catch (error) {
      console.error(error);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  toISOLocal(d: Date) {
    const z = (n) => `0${n}`.slice(-2);
    const zz = (n) => `00${n}`.slice(-3);
    let off = d.getTimezoneOffset();
    const sign = off < 0 ? '+' : '-';
    off = Math.abs(off);

    return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}T${z(
      d.getHours()
    )}:${z(d.getMinutes())}:${z(d.getSeconds())}.${zz(
      d.getMilliseconds()
    )}${sign}${z((off / 60) | 0)}:${z(off % 60)}`;
  }

  render() {
    const { dateParsed } = this.state;
    return (
      <Row style={{ padding: '15px' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <h2> Unix Time Converter</h2>
          <InputNumber
            style={{ width: '50%' }}
            min={0}
            defaultValue={915148798.75}
            onChange={this.onInputChange}
          />
          <br />
          <br />
          <h3>
            Date{' '}
            <Switch
              onChange={this.onChange}
              checkedChildren="UTC"
              unCheckedChildren="Local"
              defaultChecked
            />
          </h3>
          <p>{dateParsed}</p>
        </Col>
      </Row>
    );
  }
}

export default UnixTimeConverter;
