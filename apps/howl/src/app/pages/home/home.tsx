import { Error, Loader } from '../../common/components';
import { useWsContext } from '../../common/context';
import { Cpu } from './cpu';
import styles from './home.module.scss';
import { Load } from './load';
import { Memory } from './memory';
import { SystemStatistics } from './system-statistics';
import { UsageSummary } from './usage-summary';

export const Home = () => {
  const { loading, error } = useWsContext();

  // Websocket connection is loading
  if (loading) {
    return <Loader />;
  }

  // Error has been detected
  if (error) {
    return <Error />;
  }

  // All clear, show content
  if (!error && !loading) {
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
