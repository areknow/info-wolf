import { MetricsResponse } from '@info-wolf/api-interfaces';
import Axios, { AxiosResponse } from 'axios';

const endpoint = '/api/v1/metrics';

export const fetchMetricsData = async (): Promise<
  AxiosResponse<MetricsResponse>
> => {
  return await Axios.get(endpoint);
};
