import React, { useState } from 'react';
// Small helpers you might want to keep
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';
import PackageJson from './package.json';

// eslint-disable-next-line import/extensions
import './helpers/external_links.ts';
import SwitchTheme from './components/SwitchTheme';
import Sidebar from './components/Sidebar';
import JSONFormatterValidator from './components/jsonformattervalidator';
import JWTDecoder from './components/jwtdecoder';
import UnixTimeConverter from './components/unixtimeconverter';
import SSLInformation from './components/sslinformation';
import Base64 from './components/base64';
import URLDecoder from './components/urldecoder';
import JSONtoYaml from './components/jsontoyaml';
import YamlToJSON from './components/yamltojson';
import DiffViewer from './components/diffViewer';

const { Content, Footer, Header } = Layout;

export default function App() {
  const [theme = 'dark', setTheme] = useState();

  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };

  return (
    <Router>
      <Layout className={`site-layout-background-${theme}`}>
        <Sidebar theme={theme} />
        <Layout style={{ marginLeft: 200, height: '700px' }}>
          <Header
            className={`site-layout-background-${theme}`}
            style={{ padding: 0, textAlign: 'right' }}
          >
            <Row>
              <Col span={6}>
                <h3 className={`color-${theme}`}>Developer Utils App</h3>
              </Col>
              <Col span={6} offset={11}>
                <SwitchTheme onChange={changeTheme} />
              </Col>
            </Row>
          </Header>
          <Content
            style={{
              margin: '24px 16px 0',
              overflow: 'initial',
              height: '100%',
            }}
          >
            <Switch>
              <Route path="/json-to-yaml" component={JSONtoYaml} />
              <Route path="/diff" component={DiffViewer} />
              <Route path="/yaml-to-json" component={YamlToJSON} />
              <Route path="/url-decoder" component={URLDecoder} />
              <Route
                path="/json-formater-validator"
                component={JSONFormatterValidator}
              />
              <Route path="/ssl-information" component={SSLInformation} />
              <Route path="/base64" component={Base64} />
              <Route path="/jwt-decoder" component={JWTDecoder} />
              <Route
                path="/unix-time-converter"
                component={UnixTimeConverter}
              />
              <Route path="/" component={JSONFormatterValidator} />
            </Switch>
          </Content>
          <Footer
            style={{ textAlign: 'center'}}
            className={`color-${theme} site-layout-background-${theme}`}
          >
            {' '}
            Created with ♥ by{' '}
            <a className="js-external-link" href="https://andresmorelos.dev">
              Andres Morelos
            </a>
            ,{' '}
            <a
              className="js-external-link"
              href="https://github.com/AndresMorelos"
            >
              Github Profile
            </a>
            , Version {PackageJson.version}
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
}
