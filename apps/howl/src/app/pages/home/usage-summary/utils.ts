import {
  TimeSeriesPoint,
  UsageSummaryResponse,
} from '@info-wolf/api-interfaces';
import { CPU_SERIES_NAME } from '../../../common/constants';
import { Colors, PlotBand } from '../../../common/types';

/**
 * Create the two series with highcharts metadata for styling, and
 * a third series for the threshold plot line
 * @param data The usage summary chart series data
 * @param colors The active color scheme
 * @returns Series in a highcharts format with extra styling settings
 */
export const createSeries = (
  data: UsageSummaryResponse,
  colors: Colors
): Highcharts.SeriesOptionsType[] => {
  return [
    {
      color: colors.theme5,
      type: 'line',
      name: 'Memory usage',
      data: data.freememPercentageData,
      marker: { symbol: 'circle', radius: 10, fillColor: colors.theme5 },
    },
    {
      color: {
        linearGradient: { x1: 0, x2: 0, y1: 1, y2: 0 },
        stops: [
          [0, colors.theme3],
          [0.5, colors.theme4],
        ],
      },
      type: 'areaspline',
      name: CPU_SERIES_NAME,
      lineWidth: 1,
      data: data.cpuUsageData,
      marker: { symbol: 'circle', radius: 10, fillColor: colors.theme4 },
    },
    {
      color: colors.theme6,
      type: 'line',
      name: 'CPU Threshold',
    },
  ];
};

/**
 * Builds an array of plot bands to be displayed in the chart as threshold violations
 * @param points The data rendered in the chart
 * @param duration The minimum time (milliseconds) needed that a violation lasts to before it is shown
 * @param threshold The percentage overage violation limit
 * @returns
 */
export const calculateOverage = (
  points: TimeSeriesPoint[],
  duration: number,
  threshold: number,
  colors: Colors
): PlotBand[] => {
  const bands = [];
  let counter = 0;
  let from = undefined;
  let to = undefined;

  // Loop over the points in the chart
  for (let index = 0; index < points.length; index++) {
    // Check if the current point has violated the threshold
    if (points[index].y >= threshold) {
      // No band has been started yet
      if (counter === 0) {
        // Save the start date of the current band
        from = points[index].x;
        // Start a new band with an undefined end
        bands.push({
          from: from,
          to: undefined,
          color: colors.chart.plotBand,
        });
      }
      // Update the endpoint on every loop while the violation is occurring
      to = points[index].x;
      // Since the duration has been exceeded, add the end of the band so that
      // highcharts displays it. Bands with undefined end are not shown.
      if (to - from >= duration) {
        bands[bands.length - 1].to = to;
      }
      // Increment counter because the band is still growing
      counter++;
    } else if (counter > 0) {
      // End the counter increment because the threshold violation has ended
      // Counter should only be reset if its needed, no extra reassignment.
      counter = 0;
    }
  }
  // Only return bands that have a defined end
  return bands.filter((band) => band.to);
};

/**
 * Returns true if there are any active bands
 * @param bands
 */
export const checkForAlerts = (bands: PlotBand[]) => {
  return bands.some((band) => band.to);
};

/**
 * Store the historical time range of the terminated bands
 * @param activeBands The current active plot bands used in the chart
 * @param historicalBands The array used to store the historical data
 * @returns
 */
export const recordHistoricalOverage = (
  activeBands: PlotBand[],
  historicalBands: PlotBand[]
) => {
  for (const active of activeBands) {
    // It is necessary to check if one of the active bands is still currently in overage.
    // Giving the band 2.5 seconds to terminate as a buffer ensures that the recovered
    // bands list does not include any non terminated bands.
    if (new Date().valueOf() - active.to > 2500) {
      // Check if historical bands has a matching entry, if not; push it
      if (
        historicalBands.every(
          (historical) =>
            historical.to !== active.to && historical.from !== active.from
        )
      ) {
        historicalBands.push(active);
      }
    }
  }
  return historicalBands;
};
