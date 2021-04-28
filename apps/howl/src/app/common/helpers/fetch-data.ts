import Axios, { AxiosResponse } from 'axios';

/**
 * Axios wrapper to fetch data from provided endpoint
 * @param endpoint the api location for the request
 * @returns the generic type provided
 */
export const fetchData = async <T>(
  endpoint: string
): Promise<AxiosResponse<T>> => {
  return Axios.get(endpoint);
};
