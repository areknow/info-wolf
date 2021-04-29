import { formatDistance } from 'date-fns';
import { ReactComponent as Platform } from '../../../../assets/computer.svg';
import { ReactComponent as Cpu } from '../../../../assets/cpu.svg';
import { ReactComponent as PieChart } from '../../../../assets/pie-chart.svg';
import { ReactComponent as RamMemory } from '../../../../assets/ram-memory.svg';
import { ReactComponent as Stopwatch } from '../../../../assets/stopwatch.svg';
import { ReactComponent as Uptime } from '../../../../assets/uptime.svg';
import { Card, InfoGroup } from '../../../common/components';
import { useWsContext } from '../../../common/context';
import styles from './system-statistics.module.scss';

export const SystemStatistics = () => {
  const { data } = useWsContext();

  return (
    <Card title="System statistics">
      <div className={styles.grid}>
        <InfoGroup
          content={data.statistics.platform.toUpperCase()}
          label="Platform"
          icon={<Platform />}
        />
        <InfoGroup
          content={data.statistics.cpuCount}
          label="CPU count"
          icon={<Cpu />}
        />
        <InfoGroup
          content={formatDistance(0, data.statistics.sysUptime * 1000, {
            includeSeconds: true,
          })}
          label="System uptime"
          icon={<Uptime />}
        />
        <InfoGroup
          content={formatDistance(0, data.statistics.processUptime * 1000, {
            includeSeconds: true,
          })}
          label="Process uptime"
          icon={<Stopwatch />}
        />
        <InfoGroup
          content={`${data.statistics.totalMem / 1024} GB`}
          label="Total memory"
          icon={<RamMemory />}
        />
        <InfoGroup
          content={`${(data.statistics.freeMem / 1024).toFixed(2)} GB`}
          label="Free memory"
          icon={<PieChart />}
        />
      </div>
    </Card>
  );
};
