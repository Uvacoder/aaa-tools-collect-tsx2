import React from 'react';
import { Button } from 'antd';
import PackageJson from '../../package.json';

class AboutPage extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        {' '}
        Created with ♥ by{' '}
        <a className="js-external-link" href="https://andresmorelos.dev">
          Andres Morelos
        </a>
        ,{' '}
        <a className="js-external-link" href="https://github.com/AndresMorelos">
          Github Profile
        </a>
        <br /> <br /> <br />{' '}
        <Button
          danger
          className="js-external-link"
          href="https://github.com/AndresMorelos/developer-toolbox/issues/new/choose"
        >
          Report a bug
        </Button>
        <br /> <br /> Version {PackageJson.version}
      </div>
    );
  }
}

export default AboutPage;
