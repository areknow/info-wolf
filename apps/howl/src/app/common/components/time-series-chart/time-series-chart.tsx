import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { memo, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { DARK_THEME, LIGHT_THEME } from '../../colors';
import { useDarkModeContext } from '../../context';
import { PlotBand } from '../../types';
import { CHART_TITLE_LABEL } from './constants';
import { hideResetZoomButton } from './hide-reset-zoom';
import { configureLegendSymbols } from './legend-symbol';
import { Tooltip } from './tooltip';

declare const window: Window & {
  configureLegendSymbols: typeof configureLegendSymbols;
  hideResetZoomButton: typeof hideResetZoomButton;
};
// Add the custom highcharts changes to window scope.
window.configureLegendSymbols = configureLegendSymbols;
window.hideResetZoomButton = hideResetZoomButton;

interface TimeSeriesChartProps {
  /** The data series used in the time series chart. */
  series: Highcharts.SeriesOptionsType[];
  /** The plot bands used to highlight overages. */
  bands?: PlotBand[];
  /** The threshold plot line. */
  threshold?: number;
  /** The name of the series that the plot line/bands depend on. */
  thresholdSeriesName?: string;
  /** Event fired when a highcharts selection event takes place. */
  onZoom: () => void;
}

export const TimeSeriesChart = memo(
  ({
    thresholdSeriesName,
    series,
    bands,
    threshold,
    onZoom,
  }: TimeSeriesChartProps) => {
    const [
      thresholdLineSeriesVisible,
      setThresholdLineSeriesVisible,
    ] = useState(true);
    const { dark } = useDarkModeContext();
    const colors = dark ? DARK_THEME : LIGHT_THEME;

    const options: Highcharts.Options = {
      scrollbar: {
        enabled: true,
      },
      chart: {
        backgroundColor: 'transparent',
        animation: false,
        zoomType: 'x',
        selectionMarkerFill: colors.chart.selection,
        events: {
          // Since a custom zoom button is used, the
          // selection event needs to be captured
          // and sent back to the parent component.
          selection() {
            onZoom();
            return true;
          },
        },
      },
      time: {
        useUTC: false,
      },
      credits: {
        enabled: false,
      },
      title: {
        floating: true,
        align: 'left',
        verticalAlign: 'bottom',
        text: CHART_TITLE_LABEL,
        y: 4,
        x: 12,
        style: {
          color: colors.chart.label,
          fontFamily: 'Montserrat',
          fontSize: '10px',
          fontWeight: 'bold',
        },
      },
      subtitle: {
        text: null,
      },
      legend: {
        align: 'right',
        symbolHeight: 8,
        symbolWidth: 8,
        itemStyle: {
          color: colors.chart.label,
          fontFamily: 'Montserrat',
          fontSize: '10px',
        },
        itemHoverStyle: {
          color: colors.chart.label,
        },
      },
      yAxis: {
        plotLines: [
          {
            // Plot line visibility should match the desired series visibility.
            value: thresholdLineSeriesVisible ? threshold : null,
            color: colors.chart.plotLine,
            width: 1,
            zIndex: 5,
          },
        ],
        gridLineColor: colors.chart.border,
        tickInterval: 30,
        title: {
          text: null,
        },
        labels: {
          style: {
            color: colors.chart.text,
            fontFamily: 'Roboto Mono',
            fontSize: '10px',
          },
          formatter() {
            // Format the y axis value to add percentage symbol.
            return `${this.value}%`;
          },
        },
      },
      xAxis: {
        // Plot bands visibility should match the desired series visibility.
        plotBands: thresholdLineSeriesVisible ? bands : null,
        lineColor: colors.chart.border,
        crosshair: {
          width: 1,
          color: colors.chart.border,
          zIndex: 3,
        },
        type: 'datetime',
        dateTimeLabelFormats: {
          // Add custom date formats since the chart is
          // dealing with small time increments.
          hour: '%l %p',
          minute: '%l:%M %p',
          second: '%l:%M:%S %p',
        },
        tickLength: 4,
        tickColor: colors.chart.border,
        labels: {
          style: {
            color: colors.chart.text,
            fontSize: '10px',
            fontFamily: 'Roboto Mono',
          },
        },
      },
      plotOptions: {
        series: {
          animation: false,
          states: {
            hover: {
              enabled: false,
            },
            inactive: {
              enabled: false,
            },
          },
          events: {
            // When toggling the visibility of the desired threshold
            // series, the plot bands/line should toggle along with it
            legendItemClick() {
              // Check the name of the legend item that is clicked
              if (this.name === thresholdSeriesName) {
                // Toggle the visibility of the plot bands/line
                setThresholdLineSeriesVisible(!this.visible);
              }
            },
          },
        },
      },
      tooltip: {
        useHTML: true,
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderRadius: 0,
        shadow: false,
        shape: 'square',
        outside: true,
        padding: 0,
        style: {
          opacity: 1,
        },
        shared: true,
        positioner(width, height, point) {
          // Change the default highcharts tooltip position
          // settings to track only the x axis and stick to
          // the bottom while centered on the tooltip width.
          return {
            x: point.plotX + 102 - width / 2,
            y: this.chart.chartHeight + height - 5,
          };
        },
        formatter() {
          // Use renderToString() to render the JSX tooltip
          // component into a usable string for highcharts.
          return ReactDOMServer.renderToString(
            <Tooltip points={this.points} date={this.x} />
          );
        },
      },
      responsive: {
        rules: [
          {
            chartOptions: {
              // Hide various elements on mobile
              title: { text: '' },
              tooltip: {
                enabled: false,
              },
              xAxis: {
                crosshair: { width: 0 },
              },
            },
            condition: { maxWidth: 600 },
          },
        ],
      },
      series,
    };

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    );
  }
);
