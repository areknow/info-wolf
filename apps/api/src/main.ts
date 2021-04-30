import * as express from 'express';
import ws = require('ws');
import osu = require('node-os-utils');
import os = require('os');

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

const payload = async () => {
  return {
    load: {
      memory: (await osu.mem.info()).usedMemPercentage,
      cpu: await osu.cpu.usage(),
    },
    timeSeries: {
      cpuUsageData,
      freememPercentageData,
    },
    statistics: {
      platform: osu.os.platform(),
      cpuCount: osu.cpu.count(),
      freeMem: (await osu.mem.info()).freeMemMb,
      totalMem: osu.mem.totalMem(),
      sysUptime: osu.os.uptime(),
      operatingSystem: await osu.os.oos(),
    },
    cpu: {
      barChart: {
        series: [
          {
            name: 'User',
            data: os.cpus().map((core) => core.times.user),
          },
          {
            name: 'System',
            data: os.cpus().map((core) => core.times.sys),
          },
          {
            name: 'Idle',
            data: os.cpus().map((core) => core.times.idle),
          },
        ],
        categories: Array.from(
          { length: os.cpus().length },
          (_, i) => `Core ${i + 1}`
        ),
      },
    },
    memory: {
      pieChart: [
        (await osu.mem.info()).freeMemMb,
        (await osu.mem.info()).usedMemMb,
      ],
    },
  };
};

wsMetrics.on('connection', async (socket) => {
  socket.send(JSON.stringify(await payload()));
});

setInterval(async () => {
  // store cpu time series data
  cpuUsageData.push({ x: new Date().valueOf(), y: await osu.cpu.usage() });
  cpuUsageData.shift();
  // store memory time series data
  freememPercentageData.push({
    x: new Date().valueOf(),
    y: (await osu.mem.info()).usedMemPercentage,
  });
  freememPercentageData.shift();
  // push updated data to client
  wsMetrics.clients.forEach(async (socket) => {
    socket.send(JSON.stringify(await payload()));
  });
}, INTERVAL);
