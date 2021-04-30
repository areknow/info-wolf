import styled from 'styled-components';
import { Card, GaugeChart, PieChart } from '../../../common/components';
import { useWsContext } from '../../../common/context';

const StyledChartsContainer = styled.div`
  display: flex;
`;

export const MemoryLoad = () => {
  const { data } = useWsContext();
  console.log(data);

  return (
    <Card title="Memory load">
      <StyledChartsContainer>
        <GaugeChart value={data.memory.freePercent} />
        <PieChart series={data.memory.pieChart} labels={[' Free', ' Wired']} />
      </StyledChartsContainer>
    </Card>
  );
};
