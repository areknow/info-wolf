import { Card } from '../../common/components';
import styles from './home.module.scss';
import { LoadMetrics } from './load-metrics';
import { Metrics } from './metrics';
import { UsageSummary } from './usage-summary';

export const Home = () => {
  return (
    <>
      <div className={styles.gridRow}>
        <UsageSummary />
      </div>
      <div className={styles.grid}>
        <Metrics />
        <LoadMetrics />
        <Card title="bar">foo</Card>
      </div>
    </>
  );
};
