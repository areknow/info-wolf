import { Card, PieChart } from '../../../common/components';
import { useWsContext } from '../../../common/context';

export const Memory = () => {
  const { data } = useWsContext();

  return (
    <Card title="Memory">
      <PieChart series={data.memory.pieChart} labels={[' Free', ' Wired']} />
    </Card>
  );
};
