import * as express from 'express';
import * as os from './os-utils';
import ws = require('ws');

const app = express();
const INTERVAL = 1000;

const port = process.env.port || 3333;
const server = app.listen(port);
server.on('error', console.error);

const wsMetrics = new ws.Server({ server: server, path: '/ws/metrics' });

// start a new array with blank data values and date values going backwards in time every second for 10 minutes
const data = [];
for (let i = 0; i <= 600; i++) {
  data.push({ x: new Date().valueOf() - i * INTERVAL, y: null });
}

const cpuUsageData = [...data].reverse();
const freememPercentageData = [...data].reverse();

const payload = () => {
  const freeMem = 100 - os.freememPercentage() * 100;
  return {
    gauges: {
      freememPercentage: +freeMem.toFixed(1),
      cpuLoadAveragePercentage: +os.loadavg(5).toFixed(1),
    },
    timeSeries: {
      cpuUsageData,
      freememPercentageData,
    },
    statistics: {
      platform: os.platform(),
      cpuCount: os.cpuCount(),
      freeMem: os.freemem(),
      totalMem: os.totalmem(),
      sysUptime: os.sysUptime(),
      processUptime: os.processUptime(),
    },
  };
};

wsMetrics.on('connection', (socket) => {
  socket.send(JSON.stringify(payload()));
});

setInterval(async () => {
  // store cpu time series data
  const usage = await os.cpuUsage();
  cpuUsageData.push({ x: new Date().valueOf(), y: (usage as number) * 100 });
  cpuUsageData.shift();
  // store memory time series data
  const mem = os.freememPercentage();
  freememPercentageData.push({ x: new Date().valueOf(), y: 100 - mem * 100 });
  freememPercentageData.shift();
  // push updated data to client
  wsMetrics.clients.forEach((socket) => {
    socket.send(JSON.stringify(payload()));
  });
}, INTERVAL);
