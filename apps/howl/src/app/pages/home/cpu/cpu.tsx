import { BarChart, Card } from '../../../common/components';
import { useWsContext } from '../../../common/context';

export const Cpu = () => {
  const { data } = useWsContext();

  return (
    <Card title="CPU">
      <BarChart
        data={data.cpu.barChart.data}
        categories={data.cpu.barChart.categories}
      />
    </Card>
  );
};
