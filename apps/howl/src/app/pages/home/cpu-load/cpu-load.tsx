import { Card, GaugeChart } from '../../../common/components';
import { useWsContext } from '../../../common/context';

export const CpuLoad = () => {
  const { data } = useWsContext();

  return (
    <Card title="CPU load">
      <GaugeChart value={data.gauges.cpuLoadAveragePercentage} />
    </Card>
  );
};
