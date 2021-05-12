import { Loader } from '../../common/components';
import { useWsContext } from '../../common/context';
import { Cpu } from './cpu';
import styles from './home.module.scss';
import { Load } from './load';
import { Memory } from './memory';
import { SystemStatistics } from './system-statistics';
import { UsageSummary } from './usage-summary';

export const Home = () => {
  const { loading } = useWsContext();

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className={styles.grid}>
        <UsageSummary />
        <Load />
        <SystemStatistics />
        <Cpu />
        <Memory />
      </div>
    );
  }
};
