import { Card } from '../../common/components';
import styles from './home.module.scss';
import { LoadMetrics } from './load-metrics';
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
        <LoadMetrics />
        <Card title="bar">foo</Card>
      </div>
    </>
  );
};
