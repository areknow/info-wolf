import { WsPayload } from '@info-wolf/api-interfaces';

export const DEFAULT_STATE: WsPayload = {
  load: {
    memory: 0,
    cpu: 0,
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
    operatingSystem: '',
  },
  cpu: {
    barChart: {
      data: [],
      categories: [],
    },
  },
  memory: {
    pieChart: [],
  },
};
