import React from 'react';
import { Switch } from 'antd';
import SunIcon from '../../icons/sun';
import MoonIcon from '../../icons/moon';

interface Props {
  defaultTheme: string | unknown;
  onChange(value: boolean): void;
}
const SwitchTheme = (props: Props) => {
  const { defaultTheme, onChange } = props;

  const checked = defaultTheme === 'dark';
  return (
    <div>
      <Switch
        onChange={onChange}
        checkedChildren={<MoonIcon width="5" height="5" />}
        unCheckedChildren={<SunIcon width="5" height="5" />}
        defaultChecked={checked}
      />
    </div>
  );
};

export default SwitchTheme;
