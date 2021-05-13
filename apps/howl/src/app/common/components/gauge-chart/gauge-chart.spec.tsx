import { render } from '@testing-library/react';
import wsResponse from '../../../../__mocks__/ws-response.json';
import { GaugeChart } from './gauge-chart';

describe('BarChart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <GaugeChart value={wsResponse.load.cpu} label="foo" themeNumber={1} />
    );
    expect(baseElement).toBeTruthy();
  });
});
