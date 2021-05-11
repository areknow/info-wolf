declare let require: NodeRequire;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const highcharts = require('highcharts');

/**
 * Disable the reset zoom button from being visible since a custom
 * button is being used in the parent component to zoom out.
 * https://api.highcharts.com/class-reference/Highcharts.Chart
 */
export const hideResetZoomButton = ((): void => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  highcharts.wrap(highcharts.Chart.prototype, 'showResetZoom', function () {});
})();
