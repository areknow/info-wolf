import { render } from '@testing-library/react';
import wsResponse from '../../../../__mocks__/ws-response.json';
import { PieChart } from './pie-chart';

describe('PieChart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <PieChart series={wsResponse.memory.pieChart} labels={['foo', 'bar']} />
    );
    expect(baseElement).toBeTruthy();
  });
});
