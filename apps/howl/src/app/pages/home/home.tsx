import { Cpu } from './cpu';
import styles from './home.module.scss';
import { Load } from './load';
import { MemoryLoad } from './memory';
import { SystemStatistics } from './system-statistics';
import { UsageSummary } from './usage-summary';

export const Home = () => (
  <>
    <div className={styles.gridRow}>
      <UsageSummary />
      <Load />
    </div>
    <div className={styles.grid}>
      <SystemStatistics />
      <Cpu />
      <MemoryLoad />
    </div>
  </>
);
