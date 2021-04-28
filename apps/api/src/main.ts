import * as express from 'express';
import * as os from './os-utils';

const app = express();

// start a new array with blank data values and date values going backwards in time every second for 10 minutes
const data = [];
for (let i = 0; i <= 600; i++) {
  data.push({ x: new Date().valueOf() - i * 1000, y: null });
}

const cpuUsageData = [...data].reverse();
const freememPercentageData = [...data].reverse();

setInterval(async () => {
  const usage = await os.cpuUsage();
  const mem = os.freememPercentage();
  cpuUsageData.push({ x: new Date().valueOf(), y: (usage as number) * 100 });
  cpuUsageData.shift();
  freememPercentageData.push({ x: new Date().valueOf(), y: 100 - mem * 100 });
  freememPercentageData.shift();
}, 1000);

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

const getMetrics = async () => {
  return {
    cpuFree: (await os.cpuFree()) as number,
    cpuUsage: ((await os.cpuUsage()) as number) * 100,
    platform: os.platform(),
    cpuCount: os.cpuCount(),
    freeMem: os.freemem(),
    totalMem: os.totalmem(),
    freememPercentage: os.freememPercentage(),
    usedMemory: 100 - os.freememPercentage() * 100,
    sysUptime: os.sysUptime(),
    processUptime: os.processUptime(),
  };
};

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
