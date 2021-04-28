import { MetricsResponse } from '@info-wolf/api-interfaces';
import { formatDistance } from 'date-fns';
import { useEffect, useState } from 'react';
import { Card, InfoGroup } from '../../../common/components';
import { fetchData } from '../../../common/helpers';

const ENDPOINT = '/api/v1/metrics';

export const Metrics = () => {
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
    <Card title="System metrics">
      {!loading && (
        <>
          <div>
            <InfoGroup
              content={metrics.platform}
              label="Platform"
              icon="code"
            />
          </div>
          <div>
            <InfoGroup
              content={formatDistance(0, metrics.sysUptime * 1000, {
                includeSeconds: true,
              })}
              label="System uptime"
              icon="schedule"
            />
          </div>
          <div>
            <InfoGroup
              content={metrics.cpuCount}
              label="CPU count"
              icon="computer"
            />
          </div>
          <div>
            <InfoGroup
              content={metrics.totalMem / 1024}
              label="Total memory"
              icon="memory"
            />
          </div>
        </>
      )}
    </Card>
  );
};
