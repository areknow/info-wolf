import { UsageSummaryResponse } from '@info-wolf/api-interfaces';
import Highcharts from 'highcharts';
import { useEffect, useState } from 'react';
import { DARK_THEME, LIGHT_THEME } from '../../../common/colors';
import { Colors } from '../../../common/colors/types';
import { Card, TimeSeriesChart } from '../../../common/components';
import { useDarkModeContext, useWsContext } from '../../../common/context';
import { calculateOverage } from './utils';

const createSeries = (
  data: UsageSummaryResponse,
  colors: Colors
): Highcharts.SeriesOptionsType[] => {
  return [
    {
      color: {
        linearGradient: { x1: 0, x2: 0, y1: 1, y2: 0 },
        stops: [
          [0, colors.theme3],
          [0.5, colors.theme4],
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
  const [bands, setBands] = useState([]);
  const [duration, setDuration] = useState(30000);
  const [threshold, setThreshold] = useState(6);
  const colors = dark ? DARK_THEME : LIGHT_THEME;

  useEffect(() => {
    setSeries(createSeries(data.timeSeries, colors));
    setBands(
      calculateOverage(
        data.timeSeries.cpuUsageData,
        duration,
        threshold,
        colors
      )
    );
  }, [colors, data.timeSeries, duration, threshold]);

  return (
    <Card title="Usage over time">
      <TimeSeriesChart series={series} bands={bands} threshold={threshold} />
    </Card>
  );
};
