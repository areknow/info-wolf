import { ReactComponent as Platform } from '../../../../assets/computer.svg';
import { ReactComponent as Cpu } from '../../../../assets/cpu.svg';
import { ReactComponent as OperatingSystem } from '../../../../assets/operating-system.svg';
import { ReactComponent as PieChart } from '../../../../assets/pie-chart.svg';
import { ReactComponent as RamMemory } from '../../../../assets/ram-memory.svg';
import { ReactComponent as Uptime } from '../../../../assets/uptime.svg';
import { Card, InfoGroup } from '../../../common/components';
import { useWsContext } from '../../../common/context';
import {
  CPU_COUNT_LABEL,
  FREE_MEMORY_LABEL,
  OPERATING_SYSTEM_LABEL,
  PLATFORM_LABEL,
  SYSTEM_UPTIME_LABEL,
  TOTAL_MEMORY_LABEL,
} from './constants';
import styles from './system-statistics.module.scss';
import {
  formatFreeMemoryValue,
  formatOperatingSystemValue,
  formatPlatformValue,
  formatSystemUptimeValue,
  formatTotalMemoryValue,
} from './utils';

export const SystemStatistics = () => {
  const { data } = useWsContext();

  return (
    <Card title="Statistics">
      <div className={styles.grid}>
        <InfoGroup
          content={formatPlatformValue(data.statistics.platform)}
          label={PLATFORM_LABEL}
          icon={<Platform />}
        />
        <InfoGroup
          content={formatOperatingSystemValue(data.statistics.operatingSystem)}
          label={OPERATING_SYSTEM_LABEL}
          icon={<OperatingSystem />}
        />
        <InfoGroup
          content={data.statistics.cpuCount}
          label={CPU_COUNT_LABEL}
          icon={<Cpu />}
        />
        <InfoGroup
          content={formatSystemUptimeValue(data.statistics.sysUptime)}
          label={SYSTEM_UPTIME_LABEL}
          icon={<Uptime />}
        />
        <InfoGroup
          content={formatTotalMemoryValue(data.statistics.totalMem)}
          label={TOTAL_MEMORY_LABEL}
          icon={<RamMemory />}
        />
        <InfoGroup
          content={formatFreeMemoryValue(data.statistics.freeMem)}
          label={FREE_MEMORY_LABEL}
          icon={<PieChart />}
        />
      </div>
    </Card>
  );
};
