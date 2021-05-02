import { Card, GaugeChart } from '../../../common/components';
import { useWsContext } from '../../../common/context';

export const Load = () => {
  const { data } = useWsContext();
  return (
    <Card title="Load">
      <GaugeChart value={data.load.memory} label="Memory" />
      <GaugeChart value={data.load.cpu} label="CPU" />
    </Card>
  );
};
