import * as express from 'express';
import * as ws from 'ws';
import { INTERVAL } from './app/constants';
import { connectSocket, updateSocket } from './app/socket';
import { initTimeSeriesArray } from './app/utils';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3333;
const server = app.listen(port);
server.on('error', console.error);

export const wsMetrics = new ws.Server({ server: server, path: '/ws/metrics' });

/**
 * Initialize the time series arrays used to store chart data over time
 */
const timeSeriesData = {
  cpu: initTimeSeriesArray(INTERVAL),
  memory: initTimeSeriesArray(INTERVAL),
};

/**
 * Connect the client socket and send the payload including references
 * to the time series data arrays
 */
connectSocket(timeSeriesData);

/**
 * Update the client socket payload
 */
updateSocket(timeSeriesData, INTERVAL);
