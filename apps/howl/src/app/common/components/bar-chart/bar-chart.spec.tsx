import { render } from '@testing-library/react';
import wsResponse from '../../../../__mocks__/ws-response.json';
import { BarChart } from './bar-chart';

describe('BarChart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BarChart
        series={wsResponse.cpu.barChart.series}
        categories={wsResponse.cpu.barChart.categories}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
