import { BarChart, Card } from '../../../common/components';
import { useWsContext } from '../../../common/context';

export const Cpu = () => {
  const { data } = useWsContext();
  console.log(data.cpu);

  return (
    <Card title="CPU time">
      <BarChart
        series={data.cpu.barChart.series}
        categories={data.cpu.barChart.categories}
      />
    </Card>
  );
};
