import * as express from 'express';
import * as ws from 'ws';
import { INTERVAL } from './app/constants';
import { connectSocket, updateSocket } from './app/sockets';
import { initTimeSeriesArray } from './app/utils';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3333;
const server = app.listen(port);
server.on('error', console.error);

export const wsMetrics = new ws.Server({ server: server, path: '/ws/metrics' });

let interval = INTERVAL;

/**
 * Initialize the time series arrays used to store chart data over time
 */
const timeSeriesData = {
  cpu: initTimeSeriesArray(interval),
  memory: initTimeSeriesArray(interval),
};

/**
 * Connect the client socket and send the payload including references
 * to the time series data arrays
 */
connectSocket(timeSeriesData);
/**
 * Update the client socket payload
 */
updateSocket(timeSeriesData, interval);

/**
 * Basic health check route returns process uptime
 */
app.get('/api/uptime', (req, res) => {
  res.send({
    uptime: `${process.uptime()}`,
    refreshInterval: interval,
  });
});

/**
 * Endpoint to modify refresh interval value
 */
app.post('/api/interval', (req, res) => {
  interval = req.body.refreshInterval;
  res.send(`Interval set to ${interval} milliseconds.`);
});
