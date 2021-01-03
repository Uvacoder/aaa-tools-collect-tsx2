import React from 'react';
// Small helpers you might want to keep
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';
// eslint-disable-next-line import/extensions
import './helpers/external_links.ts';
import Sidebar from './components/Sidebar';
import JSONFormatterValidator from './components/jsonformattervalidator';
import JWTDecoder from './components/jwtdecoder';
import UnixTimeConverter from './components/unixtimeconverter';

const { Content, Footer } = Layout;

export default function App() {
  return (
    <Router>
      <Layout>
        <Sidebar />
        <Layout
          className="site-layout"
          style={{ marginLeft: 200, height: '700px' }}
        >
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px 0',
              overflow: 'initial',
              height: '100%',
            }}
          >
            <Switch>
              <Route
                path="/json-formater-validator"
                component={JSONFormatterValidator}
              />
              <Route path="/jwt-decoder" component={JWTDecoder} />
              <Route
                path="/unix-time-converter"
                component={UnixTimeConverter}
              />
              <Route path="/" component={JSONFormatterValidator} />
            </Switch>
            <Footer style={{ textAlign: 'center' }}>
              {' '}
              Created with ♥ by{' '}
              <a className="js-external-link" href="https://andresmorelos.dev">
                Andres Morelos
              </a>{' '}
              ,
              <a
                className="js-external-link"
                href="https://github.com/AndresMorelos"
              >
                Github Profile
              </a>
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}
