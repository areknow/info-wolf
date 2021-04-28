import { Card } from '../../common/components';
import { CpuLoad } from './cpu-load';
import styles from './home.module.scss';
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
        <CpuLoad />
        <Card title="bar">foo</Card>
      </div>
    </>
  );
};
