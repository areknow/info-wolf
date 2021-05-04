export interface TimeSeries {
  cpu: TimeSeriesPoint[];
  memory: TimeSeriesPoint[];
}

export interface TimeSeriesPoint {
  x: number;
  y: number;
}
export interface UsageSummaryResponse {
  cpuUsageData: TimeSeriesPoint[];
  freememPercentageData: TimeSeriesPoint[];
}

export interface WsPayload {
  load: {
    memory: number;
    cpu: number;
  };
  timeSeries: UsageSummaryResponse;
  statistics: {
    platform: string;
    cpuCount: number;
    freeMem: number;
    totalMem: number;
    sysUptime: number;
    operatingSystem: string;
  };
  cpu: {
    barChart: {
      series: { name: string; data: number[] }[];
      categories: string[];
    };
  };
  memory: {
    pieChart: number[];
  };
}
