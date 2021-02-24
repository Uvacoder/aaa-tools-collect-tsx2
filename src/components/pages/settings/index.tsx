import React from 'react';
import { withTranslation } from 'react-i18next';
import LangSwitcher from '../../langSwitcher';

const Settings = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <LangSwitcher />
    </div>
  );
};

export default withTranslation()(Settings);
