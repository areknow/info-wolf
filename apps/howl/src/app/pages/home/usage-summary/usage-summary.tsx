import { UsageSummaryResponse } from '@info-wolf/api-interfaces';
import Highcharts from 'highcharts';
import { useEffect, useState } from 'react';
import { DARK_THEME, LIGHT_THEME } from '../../../common/colors';
import { Card, TimeSeriesChart } from '../../../common/components';
import { useDarkModeContext, useWsContext } from '../../../common/context';

const createSeries = (
  data: UsageSummaryResponse,
  darkMode: boolean
): Highcharts.SeriesOptionsType[] => {
  const colors = darkMode ? DARK_THEME : LIGHT_THEME;

  return [
    {
      color: {
        linearGradient: { x1: 0, x2: 0, y1: 1, y2: 0 },
        stops: [
          [0, colors.theme3],
          [0.1, colors.theme4],
        ],
      },
      type: 'areaspline',
      name: 'CPU usage',
      lineWidth: 1,
      data: data.cpuUsageData,
      marker: { symbol: 'circle', radius: 10, fillColor: colors.theme4 },
    },
    {
      color: colors.theme5,
      type: 'line',
      name: 'Memory usage',
      data: data.freememPercentageData,
      marker: { symbol: 'circle', radius: 10, fillColor: colors.theme5 },
    },
  ];
};

export const UsageSummary = () => {
  const [series, setSeries] = useState<Highcharts.SeriesOptionsType[]>([]);
  const { data } = useWsContext();
  const { dark } = useDarkModeContext();

  useEffect(() => {
    setSeries(createSeries(data.timeSeries, dark));
  }, [dark, data.timeSeries]);

  return (
    <Card title="Usage over time">
      <TimeSeriesChart series={series} />
    </Card>
  );
};
