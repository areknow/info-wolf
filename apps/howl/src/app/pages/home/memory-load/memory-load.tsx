import { Card, GaugeChart } from '../../../common/components';
import { useWsContext } from '../../../common/context';

export const MemoryLoad = () => {
  const { data } = useWsContext();

  return (
    <Card title="Memory load">
      <GaugeChart value={data.gauges.freememPercentage} />
    </Card>
  );
};
