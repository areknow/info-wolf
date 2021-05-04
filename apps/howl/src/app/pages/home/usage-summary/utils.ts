import {
  TimeSeriesPoint,
  UsageSummaryResponse,
} from '@info-wolf/api-interfaces';
import { Colors, PlotBand } from '../../../common/types';

/**
 * Create the two series with highcharts metadata for styling
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
      color: {
        linearGradient: { x1: 0, x2: 0, y1: 1, y2: 0 },
        stops: [
          [0, colors.theme3],
          [0.5, colors.theme4],
        ],
      },
      type: 'areaspline',
      name: 'CPU usage',
      lineWidth: 1,
      data: data.cpuUsageData,
      marker: { symbol: 'circle', radius: 10, fillColor: colors.theme4 },
    },
    {
      color: colors.theme5,
      type: 'line',
      name: 'Memory usage',
      data: data.freememPercentageData,
      marker: { symbol: 'circle', radius: 10, fillColor: colors.theme5 },
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
  return bands;
};

/**
 * Returns true if there are any active bands
 * @param bands
 */
export const checkForAlerts = (bands: PlotBand[]) => {
  return bands.some((band) => band.to);
};
