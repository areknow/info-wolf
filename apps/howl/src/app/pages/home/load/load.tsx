import { Card, GaugeChart } from '../../../common/components';
import { useWsContext } from '../../../common/context';

export const Load = () => {
  const { data } = useWsContext();
  return (
    <Card title="Load">
      <GaugeChart value={data.load.memory} label="Memory" themeNumber={5} />
      <GaugeChart value={data.load.cpu} label="CPU" themeNumber={4} />
    </Card>
  );
};
