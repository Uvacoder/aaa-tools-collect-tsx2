import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  ClockCircleOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import JwtIcon from '../icons/jwtIcon';
import BracketsIcon from '../icons/brackets';

const { Sider } = Layout;

class Sidebar extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={['1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="1" icon={<BracketsIcon fill="white" />}>
            <Link to="/json-formater-validator" style={{ fontSize: '0.9em' }}>
              JSON formatter &amp; validator
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<JwtIcon />}>
            <Link to="/jwt-decoder" style={{ fontSize: '0.9em' }}>
              JWT decoder
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ClockCircleOutlined />}>
            <Link to="/unix-time-converter" style={{ fontSize: '0.9em' }}>
              Unix Time Converter
            </Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<SafetyCertificateOutlined />}>
            <Link to="/ssl-information" style={{ fontSize: '0.9em' }}>
              SSL verification
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default Sidebar;
