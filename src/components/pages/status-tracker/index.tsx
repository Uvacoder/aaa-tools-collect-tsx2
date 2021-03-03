/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-bitwise */
import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { Row, Col, Button, Modal, Form, Input, Select, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import StatusPage from './feedFetcher';
import feeder from '../../../utils/FeedReader';
import UserSettings from '../../../services/settings';

const { Option } = Select;

interface Props {
  t(code: string): string;
}

interface ResourceSetting {
  name: string;
  rss: string;
  dateIdentifier: string;
}

const StatusTracker = ({ t }: Props) => {
  const [resources, setResources] = useState<ResourceSetting[]>([]);
  const [loadResources, setLoadResources] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const FetchTimes = [
    {
      name: '30 seconds',
      time: 60000 / 2,
    },
    {
      name: '1 minute',
      time: 60000,
    },
    {
      name: '5 minutes',
      time: 60000 * 5,
    },
    {
      name: '15 minutes',
      time: 60000 * 15,
    },
    {
      name: '30 minutes',
      time: 60000 * 30,
    },
  ];

  useEffect(() => {
    if (loadResources) {
      const userResources = UserSettings.Get('statusTracker') || [];
      setResources(userResources);

      setLoadResources(false);
    }

    if (resources) {
      resources.forEach((ResourceSettings) => {
        feeder.add({
          url: ResourceSettings.rss,
          refresh: ResourceSettings.timeRefetch,
          eventName: ResourceSettings.name,
        });
      });
    }
  }, [resources, loadResources]);

  const removeResource = (name: string) => {
    const finalResources = resources.filter(
      (resource) => resource.name !== name
    );
    UserSettings.Save('statusTracker', finalResources);
    setLoadResources(true);
    return true;
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onTimeChange = (value: number) => {
    form.setFieldsValue({ refreshTime: value });
  };

  const onFinish = (values: any) => {
    UserSettings.Save('statusTracker', [...resources, values]);
    setLoadResources(true);
    form.resetFields();
    setIsModalVisible(false);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Row style={{ padding: '15px' }}>
        <Col span={24}>
          <Space>
            {t('app.sidebar.status-tracker')}
            <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
              {t('app.sidebar.status-tracker')}
            </Button>
          </Space>
          <br />
          <Space size={[8, 16]} wrap>
            {resources &&
              resources.map((resource: any) => {
                return (
                  <StatusPage
                    key={resource.name}
                    ResourceSetting={resource}
                    remove={removeResource}
                  />
                );
              })}
          </Space>
        </Col>
      </Row>

      <Modal
        title={t('pages.aws-profile-manager.add')}
        visible={isModalVisible}
        okButtonProps={{ disabled: true, style: { display: 'none' } }}
        onCancel={handleCancel}
        cancelText={t('pages.aws-profile-manager.form.cancel')}
      >
        <Form form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name="name"
            label={t('pages.aws-profile-manager.form.name')}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="rss" label="RSS Url" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="dateIdentifier"
            label="Date Identifier"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="refreshTime"
            label="Refresh Time"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select a region"
              onChange={onTimeChange}
              allowClear
            >
              {FetchTimes.map((time) => (
                <Option key={`region-${time.name}`} value={`${time.time}`}>
                  {t(`pages.statusTracker.times.${time.name}`)}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t('pages.aws-profile-manager.form.submit')}
            </Button>
            <Button htmlType="button" onClick={onReset}>
              {t('pages.aws-profile-manager.form.reset')}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default withTranslation()(StatusTracker);
