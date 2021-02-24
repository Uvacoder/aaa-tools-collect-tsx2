import React from 'react';
import { Button, Space } from 'antd';
import { withTranslation } from 'react-i18next';
import PackageJson from '../../../package.json';

interface Props {
  t(code: string): string;
}

const AboutPage = ({ t }: Props) => {
  return (
    <div style={{ textAlign: 'center' }}>
      {`${t('app.about.created')} `}
      <a className="js-external-link" href="https://andresmorelos.dev">
        Andres Morelos
      </a>
      ,{' '}
      <a className="js-external-link" href="https://github.com/AndresMorelos">
        Github Profile
      </a>
      <br /> <br /> <br />
      <Space>
        <Button
          danger
          className="js-external-link"
          href="https://github.com/AndresMorelos/developer-toolbox/issues/new/choose"
        >
          {t('app.about.report.bug')}
        </Button>
        <Button
          type="primary"
          className="js-external-link"
          href="https://paypal.me/AndresMorelosCo/5USD"
        >
          {t('app.about.donation')}
        </Button>
      </Space>
      <br /> <br /> Version {PackageJson.version}
    </div>
  );
};

export default withTranslation()(AboutPage);
