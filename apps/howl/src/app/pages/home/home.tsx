import { Card } from '../../common/components';
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
        <Card title="bar">foo</Card>
        <Card title="bar">foo</Card>
      </div>
    </>
  );
};
