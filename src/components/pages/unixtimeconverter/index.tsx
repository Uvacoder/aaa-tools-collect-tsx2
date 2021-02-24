/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-bitwise */
import React, { useEffect, useState } from 'react';
import { InputNumber, Row, Col, Switch } from 'antd';

interface Props {
  t(code: string): string;
}

const UnixTimeConverter = ({ t }: Props) => {
  const [date, setDate] = useState<string | number | Date>(915148798.75);
  const [dateParsed, setDateParsed] = useState<string | undefined>('');
  const [format, setFormat] = useState<string>('utc');

  // eslint-disable-next-line class-methods-use-this
  const toISOLocal = (d: Date) => {
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
  };

  const converDate = () => {
    try {
      const dateObject = new Date(date);
      switch (format) {
        case 'local':
          setDateParsed(toISOLocal(dateObject));
          break;
        case 'utc':
          setDateParsed(dateObject.toISOString());
          break;
        default:
          setDateParsed(undefined);
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    converDate();
  }, [date, format]);

  const onInputChange = (value: string | number | undefined) => {
    if (value && ['string', 'number'].includes(typeof value)) {
      setDate(value);
    }
  };

  const onChange = (value: boolean) => {
    const newFormat = value ? 'utc' : 'local';
    setFormat(newFormat);
  };

  return (
    <Row style={{ padding: '15px' }}>
      <Col span={24} style={{ textAlign: 'center' }}>
        <h2> Unix Time Converter</h2>
        <InputNumber
          style={{ width: '50%' }}
          min={0}
          defaultValue={915148798.75}
          onChange={onInputChange}
        />
        <br />
        <br />
        <h3>
          Date{' '}
          <Switch
            onChange={onChange}
            checkedChildren="UTC"
            unCheckedChildren="Local"
            defaultChecked
          />
        </h3>
        <p>{dateParsed}</p>
      </Col>
    </Row>
  );
};

export default UnixTimeConverter;
