import React from 'react';
import { Switch } from 'antd';
import SunIcon from '../icons/sun';
import MoonIcon from '../icons/moon';

const SwitchTheme = (props) => {
  const { onChange } = props;
  return (
    <div>
      Theme{' '}
      <Switch
        onChange={onChange}
        checkedChildren={<MoonIcon width="5" height="5" />}
        unCheckedChildren={<SunIcon width="5" height="5" />}
        defaultChecked
      />
    </div>
  );
};

export default SwitchTheme;
