import { Grid, GridRow } from '../../common/components';
import { Cpu } from './cpu';
import { Load } from './load';
import { MemoryLoad } from './memory';
import { SystemStatistics } from './system-statistics';
import { UsageSummary } from './usage-summary';

export const Home = () => (
  <GridRow gap={20}>
    <Grid templateColumns="1fr 20%" gap={20}>
      <UsageSummary />
      <Load />
    </Grid>
    <Grid templateColumns="30% 1fr 20%" gap={20}>
      <SystemStatistics />
      <Cpu />
      <MemoryLoad />
    </Grid>
  </GridRow>
);
