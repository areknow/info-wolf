import { useEffect, useState } from 'react';
import { Card, GaugeChart } from '../../../common/components';

const ENDPOINT = 'ws/metrics';

export const CpuLoad = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3333/' + ENDPOINT);
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      setPercentage(response.gauges.cpuLoadAveragePercentage);
    };
    ws.onclose = () => {
      ws.close();
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <Card title="CPU load">
      <GaugeChart value={percentage} />
    </Card>
  );
};
