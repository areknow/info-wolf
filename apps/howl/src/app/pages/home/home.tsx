import { useEffect, useState } from 'react';
import TimeSeriesChart from '../../common/components/time-series-chart';

export const Home = () => {
  const [data, setData] = useState([]);
  const [live, setLive] = useState(true);
  const [timer, setTimer] = useState(null);
  const interval = 1000;

  useEffect(() => {
    function action() {
      fetch('/api/v1/time-series')
        .then((response) => response.json())
        .then(setData);
    }
    if (live) {
      if (timer !== null) return;
      setTimer(setInterval(action, interval));
    } else {
      clearInterval(timer);
      setTimer(null);
    }
  }, [live, timer]);

  return (
    <>
      <button onClick={() => setLive(!live)}>{live ? 'pause' : 'play'}</button>
      <TimeSeriesChart data={data.slice(Math.max(data.length - 200, 1))} />
    </>
  );
};
