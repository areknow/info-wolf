declare let require: NodeRequire;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const highcharts = require('highcharts');

/**
 * Remove the markers from the chart, but leave them in the legend
 */
export const configureLegendSymbols = ((): void => {
  if (!highcharts.seriesTypes) {
    return;
  }
  highcharts.Series.prototype.drawPoints = () => null;
  // Standardize the legend marker symbols so that custom fillColor properties can be applied
  // When areaspline chart type has a gradient, it is not possible to change its marker color
  highcharts.seriesTypes.areaspline.prototype.drawLegendSymbol =
    highcharts.seriesTypes.line.prototype.drawLegendSymbol;
})();
