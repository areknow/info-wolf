import { MemoryLoadResponse } from '@info-wolf/api-interfaces';
import { useEffect, useState } from 'react';
import { Card, GaugeChart } from '../../../common/components';
import { fetchData } from '../../../common/helpers';
import styles from './memory-load.module.scss';

const ENDPOINT = 'api/v1/memory-load';

export const MemoryLoad = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<MemoryLoadResponse>(undefined);

  useEffect(() => {
    async function load() {
      const response = await fetchData<MemoryLoadResponse>(ENDPOINT);
      setMetrics(response.data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <Card title="Memory load">
      <div className={styles.charts}>
        {!loading && (
          <GaugeChart value={metrics.freememPercentage} label="Memory" />
        )}
      </div>
    </Card>
  );
};
