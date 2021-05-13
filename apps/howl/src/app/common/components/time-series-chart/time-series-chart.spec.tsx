import { render } from '@testing-library/react';
import Highcharts from 'highcharts';
import {
  CPU_SERIES_NAME,
  CPU_THRESHOLD_NAME,
  MEMORY_SERIES_NAME,
} from '../../../pages/home/usage-summary/constants';
import { createSeries } from '../../../pages/home/usage-summary/utils';
import { DARK_THEME } from '../../colors';
import { TimeSeriesChart } from './time-series-chart';

const mockTimeSeriesData = {
  cpuUsageData: [
    { x: 1620844603817, y: 1 },
    { x: 1620844604820, y: 1 },
    { x: 1620844605822, y: 1 },
  ],
  freememPercentageData: [
    { x: 1620844603817, y: 1 },
    { x: 1620844604820, y: 1 },
    { x: 1620844605822, y: 1 },
  ],
};

describe('TimeSeriesChart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TimeSeriesChart
        series={createSeries(mockTimeSeriesData, DARK_THEME)}
        threshold={0}
        thresholdSeriesName="foo"
        onZoom={jest.fn()}
      />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should show series names in legend', () => {
    const { queryByText } = render(
      <TimeSeriesChart
        series={createSeries(mockTimeSeriesData, DARK_THEME)}
        threshold={0}
        thresholdSeriesName="foo"
        onZoom={jest.fn()}
      />
    );
    expect(queryByText(CPU_SERIES_NAME)).toBeTruthy();
    expect(queryByText(MEMORY_SERIES_NAME)).toBeTruthy();
    expect(queryByText(CPU_THRESHOLD_NAME)).toBeTruthy();
  });

  it('should call onZoom event when chart selection event triggers', async () => {
    let onZoomCalled = false;
    render(
      <TimeSeriesChart
        series={createSeries(mockTimeSeriesData, DARK_THEME)}
        threshold={0}
        thresholdSeriesName="foo"
        onZoom={() => (onZoomCalled = true)}
      />
    );

    Highcharts.fireEvent(
      Highcharts.charts.find((chart) => chart),
      'selection',
      {
        xAxis: [
          {
            min: 1,
            max: 2,
          },
        ],
      }
    );
    expect(onZoomCalled).toEqual(true);
  });

  it('should apply plot bands', () => {
    const mockBands = [
      {
        from: 1620844603817,
        to: 1620844604820,
        color: 'red',
      },
    ];
    render(
      <TimeSeriesChart
        series={createSeries(mockTimeSeriesData, DARK_THEME)}
        threshold={0}
        thresholdSeriesName="foo"
        bands={mockBands}
        onZoom={jest.fn()}
      />
    );

    expect(
      Highcharts.charts.find((chart) => chart).options.xAxis[0].plotBands
    ).toEqual(mockBands);
  });

  it('should apply threshold line', () => {
    const thresholdValue = 1;
    render(
      <TimeSeriesChart
        series={createSeries(mockTimeSeriesData, DARK_THEME)}
        threshold={thresholdValue}
        thresholdSeriesName="foo"
        onZoom={jest.fn()}
      />
    );

    expect(
      Highcharts.charts.find((chart) => chart).options.yAxis[0].plotLines[0]
        .value
    ).toEqual(thresholdValue);
  });
});
