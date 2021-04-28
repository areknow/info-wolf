import { MetricsResponse } from '@info-wolf/api-interfaces';
import { useEffect, useState } from 'react';
import { Card } from '../../../common/components';

export const Metrics = () => {
  const [metrics, setMetrics] = useState<MetricsResponse>(undefined);

  useEffect(() => {
    fetch('/api/v1/metrics')
      .then((response) => response.json())
      .then((response) => {
        setMetrics(response);
      });
  }, []);

  return <Card title="System metrics">test</Card>;
};
