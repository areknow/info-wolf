import { TimeSeries, TimeSeriesPoint } from '@info-wolf/api-interfaces';
import * as osu from 'node-os-utils';
import * as os from 'os';
import { INTERVAL } from '../constants';

// start a new array with blank data values and date values going backwards in time every second for 10 minutes
export const initTimeSeriesArray = () => {
  const data = [];
  for (let i = 0; i <= 600; i++) {
    data.push({ x: new Date().valueOf() - i * INTERVAL, y: null });
  }
  return data.reverse();
};

export const getCpuUsage = async () => {
  return await osu.cpu.usage();
};

export const getUsedMemPercentage = async () => {
  return (await osu.mem.info()).usedMemPercentage;
};

export const scrollTimeSeriesArray = async (
  array: TimeSeriesPoint[],
  value: number
) => {
  array.push({
    x: new Date().valueOf(),
    y: value,
  });
  array.shift();
};

export const generatePayload = async (timeSeriesData: TimeSeries) => {
  return {
    load: {
      memory: (await osu.mem.info()).usedMemPercentage,
      cpu: await osu.cpu.usage(),
    },
    timeSeries: {
      cpuUsageData: timeSeriesData.cpu,
      freememPercentageData: timeSeriesData.memory,
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
