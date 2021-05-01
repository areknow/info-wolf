import * as express from 'express';
import * as ws from 'ws';
import { initTimeSeriesArray } from './app/helpers';
import { connectSocket, updateSocket } from './app/sockets';

const app = express();

const port = process.env.port || 3333;
const server = app.listen(port);
server.on('error', console.error);

export const wsMetrics = new ws.Server({ server: server, path: '/ws/metrics' });

const timeSeriesData = {
  cpu: initTimeSeriesArray(),
  memory: initTimeSeriesArray(),
};

connectSocket(timeSeriesData);
updateSocket(timeSeriesData);
