import { UsageSummaryResponse } from '@info-wolf/api-interfaces';
import Highcharts from 'highcharts';
import { useEffect, useState } from 'react';
import { Card, TimeSeriesChart } from '../../../common/components';
import { fetchData } from '../../../common/helpers';

const ENDPOINT = '/api/v1/time-series';

const createSeries = (
  data: UsageSummaryResponse
): Highcharts.SeriesOptionsType[] => {
  return [
    {
      color: {
        linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
        stops: [
          [0, '#e40d67'],
          [1, '#7F92D7'],
        ],
      },
      type: 'areaspline',
      name: 'CPU Usage',
      data: data.cpuUsageData,
      marker: { symbol: 'circle', radius: 10, fillColor: '#7F92D7' },
    },
    {
      color: {
        linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
        stops: [
          [0, '#e40d67'],
          [1, '#ffc115'],
        ],
      },
      type: 'line',
      name: 'Memory usage',
      data: data.freememPercentageData,
      marker: { symbol: 'circle', radius: 10, fillColor: '#e40d67' },
    },
  ];
};

export const UsageSummary = () => {
  const [series, setSeries] = useState<Highcharts.SeriesOptionsType[]>([]);
  const [live, setLive] = useState(false);
  const [timer, setTimer] = useState(null);
  const interval = 1000;

  useEffect(() => {
    async function load() {
      const response = await fetchData<UsageSummaryResponse>(ENDPOINT);
      setSeries(createSeries(response.data));
    }
    // remove or keep ability to pause?
    if (live) {
      if (timer !== null) return;
      setTimer(setInterval(load, interval));
    } else {
      clearInterval(timer);
      setTimer(null);
    }
  }, [live, timer]);

  return (
    <Card title="Usage summary">
      <TimeSeriesChart data={series} />
    </Card>
  );
};
