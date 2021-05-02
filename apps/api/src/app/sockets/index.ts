import { TimeSeries } from '@info-wolf/api-interfaces';
import { wsMetrics } from '../../main';
import { INTERVAL } from '../constants';
import {
  generatePayload,
  getCpuUsage,
  getUsedMemPercentage,
  scrollTimeSeriesArray,
} from '../utils';

/**
 * When the websocket connects, serve the entire payload immediately
 * @param timeSeriesData the time series data array references
 */
export const connectSocket = (timeSeriesData: TimeSeries) => {
  wsMetrics.on('connection', async (socket) => {
    socket.send(JSON.stringify(await generatePayload(timeSeriesData)));
  });
};

/**
 * Using the interval (1 second), update the time series data arrays
 * using the scrollTimeSeriesArray helper and then serve the entire
 * payload periodically
 * @param timeSeriesData the time series data array references
 */
export const updateSocket = (timeSeriesData: TimeSeries) => {
  setInterval(async () => {
    // Get current time
    const currentTime = new Date().valueOf();
    // Scroll arrays
    scrollTimeSeriesArray(timeSeriesData.cpu, currentTime, await getCpuUsage());
    scrollTimeSeriesArray(
      timeSeriesData.memory,
      currentTime,
      await getUsedMemPercentage()
    );
    // push updated data to client
    wsMetrics.clients.forEach(async (socket) => {
      socket.send(JSON.stringify(await generatePayload(timeSeriesData)));
    });
  }, INTERVAL);
};
