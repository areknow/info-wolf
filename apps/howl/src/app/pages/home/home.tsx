import { useEffect, useState } from 'react';
import { TimeSeriesChart } from '../../common/components';

export const Home = () => {
  const [series, setSeries] = useState([]);
  const [metrics, setMetrics] = useState(undefined);
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
      fetch('/api/v1/metrics')
        .then((response) => response.json())
        .then(setMetrics);
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
    <>
      <div>cpuUsage: {metrics?.cpuUsage}</div>
      <div>usedMemory: {metrics?.usedMemory}</div>
      <button onClick={() => setLive(!live)}>{live ? 'pause' : 'play'}</button>
      <TimeSeriesChart data={series} />
    </>
  );
};
