import { MetricsResponse } from '@info-wolf/api-interfaces';
import { useEffect, useState } from 'react';
import { Card } from '../../../common/components';
import { fetchMetricsData } from './metrics.service';

export const Metrics = () => {
  const [metrics, setMetrics] = useState<MetricsResponse>(undefined);

  useEffect(() => {
    async function load() {
      const response = await fetchMetricsData();
      setMetrics(response.data);
    }
    load();
  }, []);

  return (
    <Card title="System metrics">
      <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(metrics)}</pre>
    </Card>
  );
};
