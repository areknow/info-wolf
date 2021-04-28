import * as express from 'express';
import * as os from './os-utils';

const app = express();

const percentage = [];
setInterval(async () => {
  const percent = await os.cpuUsage();
  percentage.push([new Date().valueOf(), percent]);
}, 1000);

app.get('/api/v1/time-series', (req, res) => {
  res.send(percentage.slice(Math.max(percentage.length - 200, 1)));
});

app.get('/api/v1/metrics', async (req, res) => {
  res.send(await getMetrics());
});

const getMetrics = async () => {
  return {
    cpuFree: await os.cpuFree(),
    platform: os.platform(),
    cpuCount: os.cpuCount(),
    freeMem: os.freemem(),
    totalMem: os.totalmem(),
    freememPercentage: os.freememPercentage(),
    sysUptime: os.sysUptime(),
    processUptime: os.processUptime(),
  };
};

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
