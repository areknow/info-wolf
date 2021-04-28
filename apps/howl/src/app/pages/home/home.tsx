import { Metrics } from './metrics';
import { UsageSummary } from './usage-summary';

export const Home = () => {
  return (
    <>
      <div>
        <UsageSummary />
      </div>
      <div>
        <Metrics />
      </div>
    </>
  );
};
