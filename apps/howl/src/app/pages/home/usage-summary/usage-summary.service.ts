import { UsageSummaryResponse } from '@info-wolf/api-interfaces';
import Axios, { AxiosResponse } from 'axios';

const endpoint = '/api/v1/time-series';

export const fetchUsageSummaryData = async (): Promise<
  AxiosResponse<UsageSummaryResponse>
> => {
  return await Axios.get(endpoint);
};
