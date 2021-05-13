import wsResponseHighCpu from '../../../../__mocks__/ws-response-high-cpu.json';
import wsResponse from '../../../../__mocks__/ws-response.json';
import { DARK_THEME } from '../../../common/colors';
import {
  CPU_SERIES_NAME,
  CPU_THRESHOLD_NAME,
  MEMORY_SERIES_NAME,
  VIOLATION_DURATION,
  VIOLATION_THRESHOLD,
} from './constants';
import {
  calculateOverage,
  checkForAlerts,
  createSeries,
  recordHistoricalOverage,
} from './utils';

describe('UsageSummary utils', () => {
  it('should create 3 series from data', () => {
    const result = createSeries(wsResponse.timeSeries, DARK_THEME);
    expect(result.length).toEqual(3);
  });

  it('should create 1 series for memory values', () => {
    const result = createSeries(wsResponse.timeSeries, DARK_THEME);
    expect(
      result.filter((result) => result.name === MEMORY_SERIES_NAME).length
    ).toEqual(1);
  });

  it('should create 1 series for cpu values', () => {
    const result = createSeries(wsResponse.timeSeries, DARK_THEME);
    expect(
      result.filter((result) => result.name === CPU_SERIES_NAME).length
    ).toEqual(1);
  });

  it('should create 1 series for cpu threshold', () => {
    const result = createSeries(wsResponse.timeSeries, DARK_THEME);
    expect(
      result.filter((result) => result.name === CPU_THRESHOLD_NAME).length
    ).toEqual(1);
  });

  it('should calculate overage and find 0 overage plot band', () => {
    expect(
      calculateOverage(
        wsResponse.timeSeries.cpuUsageData,
        120000,
        80,
        DARK_THEME
      ).length
    ).toEqual(0);
  });

  it('should calculate overage and find 1 overage plot band', () => {
    expect(
      calculateOverage(wsResponse.timeSeries.cpuUsageData, 1, 1, DARK_THEME)
        .length
    ).toEqual(1);
  });

  it('should calculate overage and find 2 overage plot band', () => {
    expect(
      calculateOverage(
        wsResponse.timeSeries.cpuUsageData,
        10000,
        10,
        DARK_THEME
      ).length
    ).toEqual(2);
  });

  it('should calculate overage and find 1 overage plot band that spans entire chart', () => {
    const mockCpuData = wsResponseHighCpu.timeSeries.cpuUsageData;
    const result = calculateOverage(mockCpuData, 1, 1, DARK_THEME);
    expect(result.length).toEqual(1);
    expect(result[0].from).toEqual(mockCpuData[0].x);
    expect(result[0].to).toEqual(mockCpuData[mockCpuData.length - 1].x);
  });

  it('should return false for alerts check', () => {
    expect(
      checkForAlerts(
        calculateOverage(
          wsResponse.timeSeries.cpuUsageData,
          VIOLATION_DURATION,
          VIOLATION_THRESHOLD,
          DARK_THEME
        )
      )
    ).toEqual(false);
  });

  it('should return true for alerts check', () => {
    expect(
      checkForAlerts(
        calculateOverage(wsResponse.timeSeries.cpuUsageData, 1, 1, DARK_THEME)
      )
    ).toEqual(true);
  });

  it('should record 1 historical overage', () => {
    expect(
      recordHistoricalOverage(
        calculateOverage(wsResponse.timeSeries.cpuUsageData, 1, 1, DARK_THEME),
        []
      ).length
    ).toEqual(1);
  });

  it('should record 0 historical overages', () => {
    expect(
      recordHistoricalOverage(
        calculateOverage(
          wsResponse.timeSeries.cpuUsageData,
          VIOLATION_DURATION,
          VIOLATION_THRESHOLD,
          DARK_THEME
        ),
        []
      ).length
    ).toEqual(0);
  });
});
