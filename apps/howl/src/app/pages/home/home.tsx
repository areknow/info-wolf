import { CpuLoad } from './cpu-load';
import styles from './home.module.scss';
import { MemoryLoad } from './memory-load';
import { SystemStatistics } from './system-statistics';
import { UsageSummary } from './usage-summary';

export const Home = () => {
  return (
    <>
      <div className={styles.gridRow}>
        <UsageSummary />
      </div>
      <div className={styles.grid}>
        <SystemStatistics />
        <CpuLoad />
        <MemoryLoad />
      </div>
    </>
  );
};
