import { WsPayload } from '@info-wolf/api-interfaces';

export const DEFAULT_STATE: WsPayload = {
  gauges: {
    cpuLoadAveragePercentage: 0,
    freememPercentage: 0,
  },
  timeSeries: {
    cpuUsageData: [],
    freememPercentageData: [],
  },
  statistics: {
    platform: '',
    cpuCount: 0,
    freeMem: 0,
    totalMem: 0,
    sysUptime: 0,
    processUptime: 0,
  },
  memory: {
    pieChart: [],
    freePercent: 0,
  },
};
