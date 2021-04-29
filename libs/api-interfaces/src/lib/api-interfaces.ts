export interface WsPayload {
  gauges: {
    cpuLoadAveragePercentage: number;
    freememPercentage: number;
  };
  timeSeries: {
    cpuUsageData: TimeSeriesPoint[];
    freememPercentageData: TimeSeriesPoint[];
  };
  statistics: {
    platform: string;
    cpuCount: number;
    freeMem: number;
    totalMem: number;
    sysUptime: number;
    processUptime: number;
  };
}

interface TimeSeriesPoint {
  x: number;
  y: number;
}
export interface UsageSummaryResponse {
  cpuUsageData: TimeSeriesPoint[];
  freememPercentageData: TimeSeriesPoint[];
}

export interface MetricsResponse {
  cpuCount: number;
  cpuFree: number;
  cpuUsage: number;
  freeMem: number;
  freememPercentage: number;
  loadavg: number;
  platform: string;
  processUptime: number;
  sysUptime: number;
  totalMem: number;
  usedMemory: number;
}

export interface CpuLoadResponse {
  cpuLoadAveragePercentage: number;
}

export interface MemoryLoadResponse {
  freememPercentage: number;
}
