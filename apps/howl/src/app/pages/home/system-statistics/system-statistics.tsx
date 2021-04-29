import { MetricsResponse } from '@info-wolf/api-interfaces';
import { formatDistance } from 'date-fns';
import { useEffect, useState } from 'react';
import { ReactComponent as Platform } from '../../../../assets/computer.svg';
import { ReactComponent as Cpu } from '../../../../assets/cpu.svg';
import { ReactComponent as PieChart } from '../../../../assets/pie-chart.svg';
import { ReactComponent as RamMemory } from '../../../../assets/ram-memory.svg';
import { ReactComponent as Stopwatch } from '../../../../assets/stopwatch.svg';
import { ReactComponent as Uptime } from '../../../../assets/uptime.svg';
import { Card, InfoGroup } from '../../../common/components';
import { fetchData } from '../../../common/helpers';
import styles from './system-statistics.module.scss';

const ENDPOINT = '/api/v1/metrics';

export const SystemStatistics = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<MetricsResponse>(undefined);
  // const [wsData, setWsData] = useState(undefined);
  // const ws = new WebSocket('ws://localhost:3333/dashboard');

  // ws.onmessage = (w) => {
  //   console.log(w);
  //   setWsData(w.data);
  // };

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
            icon={<Platform />}
          />
          <InfoGroup
            content={metrics.cpuCount}
            label="CPU count"
            icon={<Cpu />}
          />
          <InfoGroup
            content={formatDistance(0, metrics.sysUptime * 1000, {
              includeSeconds: true,
            })}
            label="System uptime"
            icon={<Uptime />}
          />
          <InfoGroup
            content={formatDistance(0, metrics.processUptime * 1000, {
              includeSeconds: true,
            })}
            label="Process uptime"
            icon={<Stopwatch />}
          />
          <InfoGroup
            content={`${metrics.totalMem / 1024} GB`}
            label="Total memory"
            icon={<RamMemory />}
          />
          <InfoGroup
            content={`${(metrics.freeMem / 1024).toFixed(2)} GB`}
            label="Free memory"
            icon={<PieChart />}
          />
        </div>
      )}
    </Card>
  );
};
