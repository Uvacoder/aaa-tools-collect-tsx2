/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-bitwise */
import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import {
  Row,
  Col,
  Button,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Card,
} from 'antd';
import { awsAccounts } from 'aws-accounts';
import { CheckCircleTwoTone, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Meta } = Card;

interface Props {
  t(code: string): string;
}

const AWSProfileManager = ({ t }: Props) => {
  const [profiles, setProfiles] = useState<any>(undefined);
  const [defaultProfile, setDefaultProfile] = useState<any>({});
  const [regions, setRegions] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const loadProfiles = () => {
    const profilesLoaded: any = awsAccounts.getCredentials();

    const defaultProf = profilesLoaded.filter(
      (profile: any) => profile.name === 'default'
    );

    const profilesToSet = profilesLoaded.filter(
      (profile: any) => profile.name !== 'default'
    );

    setDefaultProfile(defaultProf[0]);
    setProfiles(profilesToSet);
  };

  useEffect(() => {
    loadProfiles();
    setRegions(
      Object.keys(awsAccounts.regions).map<string>(
        (region: string) => awsAccounts.regions[region]
      )
    );
  }, []);

  const handleSwitch = (value: string) => {
    awsAccounts.switchProfile(value).saveFile();
    loadProfiles();
  };

  const handleDelete = (value: string) => {
    awsAccounts.deleteProfile(value).saveFile();
    loadProfiles();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onRegionChange = (value: string) => {
    form.setFieldsValue({ region: value });
  };

  const onFinish = (values: any) => {
    awsAccounts.addProfile(values).saveFile();
    form.resetFields();
    setIsModalVisible(false);
    loadProfiles();
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Row style={{ padding: '15px' }}>
        <Col span={24}>
          <Space>
            <h2> AWS Profile Manager</h2>
            <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
              {t('pages.aws-profile-manager.add')}
            </Button>
          </Space>
          <br />
          <Space size={[8, 16]} wrap>
            {profiles &&
              profiles.map((profile: any) => {
                const isDefault: boolean =
                  profile.aws_access_key_id ===
                  defaultProfile.aws_access_key_id;

                return (
                  <Card
                    key={`Profile-${profile.name}`}
                    style={{ width: 310 }}
                    actions={[
                      <Button
                        disabled={isDefault}
                        type="text"
                        key={`button-default-${profile.name}`}
                        onClick={() => handleSwitch(profile.name)}
                      >
                        {t('pages.aws-profile-manager.makeDefault')}
                      </Button>,
                      <Button
                        disabled={isDefault}
                        danger
                        type="text"
                        key={`button-default-${profile.name}`}
                        onClick={() => handleDelete(profile.name)}
                      >
                        {t('pages.aws-profile-manager.delete')}
                      </Button>,
                    ]}
                  >
                    <Meta
                      title={
                        <p>
                          {`${profile.name}\u00A0`}
                          {isDefault ? (
                            <CheckCircleTwoTone twoToneColor="#52c41a" />
                          ) : null}
                        </p>
                      }
                    />
                  </Card>
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
            rules={[
              { required: true },
              () => ({
                validator(_, value) {
                  if (value === 'default') {
                    // eslint-disable-next-line prefer-promise-reject-errors
                    return Promise.reject("The name 'default' is reserved");
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="aws_access_key_id"
            label="Access Key"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="aws_secret_access_key"
            label="Access Secret Key"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="region" label="Region" rules={[{ required: true }]}>
            <Select
              placeholder="Select a region"
              onChange={onRegionChange}
              allowClear
            >
              {regions.map((region) => (
                <Option key={`region-${region}`} value={`${region}`}>
                  {region}
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

export default withTranslation()(AWSProfileManager);
