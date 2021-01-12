import React from 'react';
import { withTranslation } from 'react-i18next';
import LangSwitcher from '../../langSwitcher';

class Settings extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <LangSwitcher />
      </div>
    );
  }
}

export default withTranslation()(Settings);
