import { MetricsResponse } from '@info-wolf/api-interfaces';
import { formatDistance } from 'date-fns';
import { useEffect, useState } from 'react';
import { Card, InfoGroup } from '../../../common/components';
import { fetchData } from '../../../common/helpers';
import styles from './system-statistics.module.scss';

const ENDPOINT = '/api/v1/metrics';

export const SystemStatistics = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<MetricsResponse>(undefined);

  useEffect(() => {
    async function load() {
      const response = await fetchData<MetricsResponse>(ENDPOINT);
      setMetrics(response.data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <Card title="System statistics">
      {!loading && (
        <div className={styles.grid}>
          <InfoGroup
            content={metrics.platform.toUpperCase()}
            label="Platform"
            icon="laptop"
          />
          <InfoGroup
            content={metrics.cpuCount}
            label="CPU count"
            icon="developer_board"
          />
          <InfoGroup
            content={formatDistance(0, metrics.sysUptime * 1000, {
              includeSeconds: true,
            })}
            label="System uptime"
            icon="timer"
          />
          <InfoGroup
            content={formatDistance(0, metrics.processUptime * 1000, {
              includeSeconds: true,
            })}
            label="Process uptime"
            icon="timer"
          />
          <InfoGroup
            content={`${metrics.totalMem / 1024} GB`}
            label="Total memory"
            icon="memory"
          />
          <InfoGroup
            content={`${metrics.freeMem.toFixed(2)} MB`}
            label="Free memory"
            icon="memory"
          />
        </div>
      )}
    </Card>
  );
};
