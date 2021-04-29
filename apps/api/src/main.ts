import * as express from 'express';
import * as os from './os-utils';
import ws = require('ws');

const app = express();
const INTERVAL = 1000;

// start a new array with blank data values and date values going backwards in time every second for 10 minutes
const data = [];
for (let i = 0; i <= 600; i++) {
  data.push({ x: new Date().valueOf() - i * INTERVAL, y: null });
}

const cpuUsageData = [...data].reverse();
const freememPercentageData = [...data].reverse();

setInterval(async () => {
  // store cpu time series data
  const usage = await os.cpuUsage();
  cpuUsageData.push({ x: new Date().valueOf(), y: (usage as number) * 100 });
  cpuUsageData.shift();
  // store memory time series data
  const mem = os.freememPercentage();
  freememPercentageData.push({ x: new Date().valueOf(), y: 100 - mem * 100 });
  freememPercentageData.shift();
}, INTERVAL);

const getMetrics = async () => {
  return {
    platform: os.platform(),
    cpuCount: os.cpuCount(),
    freeMem: os.freemem(),
    totalMem: os.totalmem(),
    sysUptime: os.sysUptime(),
    processUptime: os.processUptime(),
  };
};

app.get('/api/v1/time-series', (req, res) => {
  res.send({
    cpuUsageData,
    freememPercentageData,
  });
});

app.get('/api/v1/metrics', async (req, res) => {
  res.send(await getMetrics());
});

app.get('/api/v1/cpu-load', async (req, res) => {
  res.send({
    cpuLoadAveragePercentage: os.loadavg(5),
  });
});

app.get('/api/v1/memory-load', async (req, res) => {
  res.send({
    freememPercentage: 100 - os.freememPercentage() * 100,
  });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);

const wssadmin = new ws.Server({ server: server, path: '/api/memory-load' });

wssadmin.on('connection', (socket) => {
  const value = 100 - os.freememPercentage() * 100;
  socket.send(
    JSON.stringify({
      freememPercentage: +value.toFixed(2),
    })
  );
});

setInterval(
  () =>
    wssadmin.clients.forEach((s) => {
      const value = 100 - os.freememPercentage() * 100;
      s.send(
        JSON.stringify({
          freememPercentage: +value.toFixed(2),
        })
      );
    }),
  1000
);
