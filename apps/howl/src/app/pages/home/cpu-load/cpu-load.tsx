import { CpuLoadResponse } from '@info-wolf/api-interfaces';
import { useEffect, useState } from 'react';
import { Card, GaugeChart } from '../../../common/components';
import { fetchData } from '../../../common/helpers';
import styles from './cpu-load.module.scss';

const ENDPOINT = 'api/v1/cpu-load';

export const CpuLoad = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<CpuLoadResponse>(undefined);

  useEffect(() => {
    async function load() {
      const response = await fetchData<CpuLoadResponse>(ENDPOINT);
      setMetrics(response.data);
      // setLoading(false);
    }
    load();
  }, []);

  return (
    <Card title="CPU load">
      <div className={styles.charts}>
        {!loading && (
          <GaugeChart value={metrics.cpuLoadAveragePercentage} label="CPU" />
        )}
      </div>
    </Card>
  );
};
