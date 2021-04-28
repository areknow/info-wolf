import { useEffect, useState } from 'react';
import { Card, TimeSeriesChart } from '../../../common/components';

export const UsageSummary = () => {
  const [series, setSeries] = useState([]);
  const [live, setLive] = useState(true);
  const [timer, setTimer] = useState(null);
  const interval = 1000;

  useEffect(() => {
    function load() {
      fetch('/api/v1/time-series')
        .then((response) => response.json())
        .then((response) => {
          setSeries([
            {
              type: 'area',
              name: 'cpuUsage',
              data: response.cpuUsageData,
            },
            {
              type: 'line',
              name: 'usedMemPercentage',
              data: response.freememPercentageData,
            },
          ]);
        });
    }
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
