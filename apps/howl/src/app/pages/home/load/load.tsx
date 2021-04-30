import { Card, GaugeChart } from '../../../common/components';
import { useWsContext } from '../../../common/context';

export const Load = () => {
  const { data } = useWsContext();
  return (
    <Card title="Load">
      <GaugeChart value={data.load.memory} />
      <GaugeChart value={data.load.cpu} />
    </Card>
  );
};
