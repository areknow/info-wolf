import { BarChart, Card } from '../../../common/components';
import { useWsContext } from '../../../common/context';

export const Cpu = () => {
  const { data } = useWsContext();

  return (
    <Card title="CPU time">
      <BarChart
        series={data.cpu.barChart.series}
        categories={data.cpu.barChart.categories}
      />
    </Card>
  );
};
