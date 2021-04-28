import { LoadMetricsResponse } from '@info-wolf/api-interfaces';
import { useEffect, useState } from 'react';
import { Card, GaugeChart } from '../../../common/components';
import { fetchData } from '../../../common/helpers';
import styles from './load-metrics.module.scss';

const ENDPOINT = 'api/v1/cpu-load';

export const LoadMetrics = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<LoadMetricsResponse>(undefined);

  useEffect(() => {
    async function load() {
      const response = await fetchData<LoadMetricsResponse>(ENDPOINT);
      setMetrics(response.data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <Card title="Load metrics">
      <div className={styles.charts}>
        {!loading && <GaugeChart value={metrics.loadAverage} label="CPU" />}
        {!loading && (
          <GaugeChart value={metrics.freememPercentage} label="Memory" />
        )}
      </div>
    </Card>
  );
};
