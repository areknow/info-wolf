import { TimeSeries, TimeSeriesPoint } from '@info-wolf/api-interfaces';
import * as osu from 'node-os-utils';
import * as os from 'os';
import { TEN_MINUTES } from '../constants';

/**
 * Build a new array with blank data values and `null` date values going
 * backwards in time every interval value for 10 minutes (TEN_MINUTES).
 * `null` is used in the TimeSeriesPoint because highcharts will ignore it
 * https://api.highcharts.com/highcharts/plotOptions.series.connectNulls
 * @returns array of null TimeSeriesPoint
 */
export const initTimeSeriesArray = (interval: number) => {
  const data = [];
  for (let i = 0; i <= TEN_MINUTES; i++) {
    data.push({ x: new Date().valueOf() - i * interval, y: null });
  }
  return data.reverse();
};

/** CPU usage util */
export const getCpuUsage = async () => {
  return await osu.cpu.usage();
};

/** Memory usage util */
export const getUsedMemPercentage = async () => {
  return (await osu.mem.info()).usedMemPercentage;
};

/**
 * Push a new TimeSeriesPoint into reference array and shift first value
 * out of it to create a sliding window effect in the chart.
 * @param array reference array to mutate
 * @param value x axis value to add at most recent point of chart
 */
export const scrollTimeSeriesArray = async (
  array: TimeSeriesPoint[],
  xValue: number,
  yValue: number
) => {
  array.push({
    x: xValue,
    y: yValue,
  });
  array.shift();
};

/**
 * The payload that the websocket connection serves to the client
 * @param timeSeriesData the time series data array references
 * @returns WsPayload
 */
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
        /**
         * Create a array of categories from the length of
         * CPU cores detected using os tools lib.
         * Output: ['Core 1', 'Core 2', ... 'Core n']
         */
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
