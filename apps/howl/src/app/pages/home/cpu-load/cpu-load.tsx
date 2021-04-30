import styled from 'styled-components';
import { Card, GaugeChart } from '../../../common/components';
import { useWsContext } from '../../../common/context';

const StyledChartsContainer = styled.div`
  display: flex;
`;

export const CpuLoad = () => {
  const { data } = useWsContext();

  return (
    <Card title="CPU load">
      <StyledChartsContainer>
        <GaugeChart value={data.gauges.freememPercentage} />
        <GaugeChart value={data.gauges.cpuLoadAveragePercentage} />
      </StyledChartsContainer>
    </Card>
  );
};
