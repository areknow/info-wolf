import { UsageSummaryResponse } from '@info-wolf/api-interfaces';
import { useEffect, useState } from 'react';
import { Card, TimeSeriesChart } from '../../../common/components';
import { fetchData } from '../../../common/helpers';

const ENDPOINT = '/api/v1/time-series';

const createSeries = (data: UsageSummaryResponse) => {
  return [
    {
      type: 'area',
      name: 'CPU Usage',
      data: data.cpuUsageData,
    },
    {
      type: 'line',
      name: 'Memory usage',
      data: data.freememPercentageData,
    },
  ];
};

export const UsageSummary = () => {
  const [series, setSeries] = useState<Highcharts.SeriesOptions[]>([]);
  const [live, setLive] = useState(true);
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
