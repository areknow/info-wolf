import { TimeSeries } from '@info-wolf/api-interfaces';
import { wsMetrics } from '../../main';
import { INTERVAL } from '../constants';
import {
  generatePayload,
  getCpuUsage,
  getUsedMemPercentage,
  scrollTimeSeriesArray,
} from '../helpers';

export const connectSocket = (timeSeriesData: TimeSeries) => {
  wsMetrics.on('connection', async (socket) => {
    socket.send(JSON.stringify(await generatePayload(timeSeriesData)));
  });
};

export const updateSocket = (timeSeriesData: TimeSeries) => {
  setInterval(async () => {
    scrollTimeSeriesArray(timeSeriesData.cpu, await getCpuUsage());
    scrollTimeSeriesArray(timeSeriesData.memory, await getUsedMemPercentage());
    // push updated data to client
    wsMetrics.clients.forEach(async (socket) => {
      socket.send(JSON.stringify(await generatePayload(timeSeriesData)));
    });
  }, INTERVAL);
};
