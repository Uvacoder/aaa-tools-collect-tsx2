import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { Card, Button } from 'antd';
import {
  CheckCircleTwoTone,
  InfoCircleTwoTone,
  SyncOutlined,
} from '@ant-design/icons';
import feeder from '../../../../utils/FeedReader';

const { Meta } = Card;

interface Props {
  t(code: string): string;
  remove(name: string): boolean;
  ResourceSetting: {
    name: string;
    rss: string;
    dateIdentifier: string;
  };
}
interface Item {
  title: string;
  summary: string;
  link: string;
}

function StatusPage({ t, remove, ResourceSetting }: Props) {
  const [status, setStatus] = useState<string>('ok');
  const [incidentItem, setIncidentItem] = useState<Item | undefined>(undefined);
  const handleLastItem = (item: Item) => {
    const dateItem = new Date(item[ResourceSetting.dateIdentifier]);
    const today = new Date();

    const MAX_DIFFERENCE = 8.64e7; // 1 day

    const difference = today.getTime() - dateItem.getTime();

    if (difference <= MAX_DIFFERENCE) {
      setStatus('warning');
      setIncidentItem(item);
    }
  };

  useEffect(() => {
    feeder.on(`initial-load:${ResourceSetting.rss}`, ({ url, items }) => {
      if (items.lastItem !== undefined) {
        handleLastItem(items.lastItem);
      }
      feeder.on(ResourceSetting.name, (item) => {
        if (item !== undefined) {
          handleLastItem(item);
        }
      });
    });
  }, []);

  return (
    <Card
      key={`resource-${ResourceSetting.name}`}
      style={{ width: 310 }}
      actions={[
        <Button
          key={`incident-link-${ResourceSetting.name}`}
          href={incidentItem && incidentItem.link}
          className="js-external-link"
          type="primary"
          disabled={status === 'ok'}
        >
          {t('pages.statusTracker.openIncident')}
        </Button>,
        <Button
          key={`incident-link-${ResourceSetting.name}`}
          onClick={() => {
            remove(ResourceSetting.name);
          }}
          danger
        >
          {t('commons.buttons.delete')}
        </Button>,
      ]}
    >
      <Meta
        title={
          <p>
            {`${ResourceSetting.name}\u00A0`}
            {status === 'ok' ? (
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            ) : (
              <InfoCircleTwoTone twoToneColor="#e67c12" />
            )}
          </p>
        }
      />
      {incidentItem && <p>{incidentItem.title}</p>}
    </Card>
  );
}

export default withTranslation()(StatusPage);
