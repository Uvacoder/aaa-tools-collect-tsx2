import React, { useState } from 'react';
import { Input, Row, Col, Select } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { withTranslation } from 'react-i18next';
import Copy from '../../../utils/copy';

const { TextArea } = Input;
const { Option } = Select;

interface Props {
  t(code: string): string;
}

const RegexTester = ({ t }: Props) => {
  const [regex, setRegex] = useState<RegExp | undefined>(undefined);
  const [regexValue, setRegexValue] = useState<string>('');
  const [textAreaInput, setTextAreaInput] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [optionsSelected, setOptionsSelectd] = useState<string[]>(['g', 'm']);

  const matchRegexp = (str: string, rg: RegExp | undefined) => {
    if (rg) {
      let m;
      let resultRegex = '';

      // eslint-disable-next-line no-cond-assign
      while ((m = rg.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === rg.lastIndex) {
          rg.lastIndex += 1;
        }

        // The result can be accessed through the `m`-variable.
        // eslint-disable-next-line @typescript-eslint/no-loop-func
        m.forEach((match: any, groupIndex: number, data: string[]) => {
          if (match) {
            resultRegex += `Group ${groupIndex} | Index: ${data.index} - ${
              data.index + match.length
            } | Match: ${match.replace('\n', '↵')}  \n`;
          }
        });
        setResult(resultRegex);
      }
    }
  };

  const onTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const testIntput = event.target.value;
      setTextAreaInput(testIntput);
      if (regex) {
        matchRegexp(testIntput, regex);
      }
    } catch (error) {
      if (event.target.value) {
        setResult(error.message);
      } else {
        setResult(null);
      }
    }
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setResult(null);
      setRegexValue(event.target.value);
      const inputValue = event.target.value;
      const regexp = new RegExp(inputValue, optionsSelected.join(''));
      setRegex(regexp);

      if (textAreaInput) {
        matchRegexp(textAreaInput, regexp);
      }
    } catch (error) {
      setResult(null);
    }
  };

  const handleSelectChange = (value: string[]) => {
    if (value !== optionsSelected && value.length > 0) {
      setOptionsSelectd(value);
      const regexp = new RegExp(regexValue, value.join(''));
      setRegex(regexp);

      if (textAreaInput) {
        matchRegexp(textAreaInput, regexp);
      }
    }
  };

  return (
    <Row style={{ padding: '15px', height: '100%' }} gutter={[16, 16]}>
      <Col span={24}>
        <Row>
          <Col span={19}>
            <Input onChange={onInputChange} />
          </Col>
          <Col span={5}>
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select"
              defaultValue={optionsSelected}
              onChange={handleSelectChange}
            >
              <Option value="g">g</Option>
              <Option value="m">m</Option>
              <Option value="i">i</Option>
              <Option value="y">y</Option>
              <Option value="u">u</Option>
              <Option value="s">s</Option>
            </Select>
          </Col>
        </Row>
      </Col>

      <Col span={12}>
        <TextArea rows={23} onChange={onTextAreaChange} />
      </Col>
      <Col span={11} offset={1}>
        <TextArea rows={23} readOnly value={result} />
      </Col>
    </Row>
  );
};

export default withTranslation()(RegexTester);
