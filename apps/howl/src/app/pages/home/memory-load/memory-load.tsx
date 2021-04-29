import { useEffect, useState } from 'react';
import { Card, GaugeChart } from '../../../common/components';
import styles from './memory-load.module.scss';

const ENDPOINT = 'api/v1/memory-load';

export const MemoryLoad = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3333/api/memory-load');
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      setPercentage(response.freememPercentage);
    };
    ws.onclose = () => {
      ws.close();
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <Card title="Memory load">
      <div className={styles.charts}>
        <GaugeChart value={percentage} label="Memory" />
      </div>
    </Card>
  );
};
