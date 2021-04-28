import { CpuLoadResponse } from '@info-wolf/api-interfaces';
import { useEffect, useState } from 'react';
import { Card, GaugeChart } from '../../../common/components';
import { fetchData } from '../../../common/helpers';
import styles from './cpu-load.module.scss';

const ENDPOINT = 'api/v1/cpu-load';

export const CpuLoad = () => {
  const [loading, setLoading] = useState(true);
  const [cpuLoad, setCpuLoad] = useState<number>(0);

  useEffect(() => {
    async function load() {
      const response = await fetchData<CpuLoadResponse>(ENDPOINT);
      setCpuLoad(response.data.loadAverage);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <Card title="Load metrics">
      <div className={styles.charts}>
        {!loading && <GaugeChart value={cpuLoad} label="CPU" />}
        {!loading && <GaugeChart value={cpuLoad} label="CPU" />}
      </div>
    </Card>
  );
};
