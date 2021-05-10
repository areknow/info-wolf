import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { memo, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { DARK_THEME, LIGHT_THEME } from '../../colors';
import { CPU_SERIES_NAME } from '../../constants';
import { useDarkModeContext } from '../../context';
import { PlotBand } from '../../types';
import { configureLegendSymbols } from './legend-symbol';
import { Tooltip } from './tooltip';

declare const window: Window & {
  configureLegendSymbols: typeof configureLegendSymbols;
};
window.configureLegendSymbols = configureLegendSymbols;

interface TimeSeriesChartProps {
  series: Highcharts.SeriesOptionsType[];
  bands?: PlotBand[];
  threshold: number;
}

export const TimeSeriesChart = memo(
  ({ series, bands, threshold }: TimeSeriesChartProps) => {
    const [cpuLineVisible, setCpuLineVisible] = useState(true);
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
        resetZoomButton: {
          position: {
            x: -1,
            y: 4,
          },
          relativeTo: 'spacingBox',
          theme: {
            fill: colors.background,
            stroke: colors.chart.border,
            r: 0,
            style: {
              color: colors.chart.label,
            },
            states: {
              hover: {
                fill: colors.chart.border,
              },
            },
          },
        },
        selectionMarkerFill: colors.chart.selection,
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
        text: 'Draw a selection on the chart to zoom in',
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
            // Plot line visibility should match the cpu series
            value: cpuLineVisible ? threshold : null,
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
            return `${this.value}%`;
          },
        },
      },
      xAxis: {
        // Plot bands visibility should match the cpu series
        plotBands: cpuLineVisible ? bands : null,
        lineColor: colors.chart.border,
        crosshair: {
          width: 1,
          color: colors.chart.border,
          zIndex: 3,
        },
        type: 'datetime',
        dateTimeLabelFormats: {
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
            /**
             * When toggling the visibility of the CPU series,
             * the plot bands/line should toggle along with it
             */
            legendItemClick() {
              // Check the name of the legend item that is clicked
              if (this.name === CPU_SERIES_NAME) {
                // Toggle the visibility of the plot bands/line
                setCpuLineVisible(!this.visible);
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
          /**
           * Change the default highcharts tooltip position
           * settings to track only the x axis and stick to
           * the bottom while centered on the tooltip width.
           */
          return {
            x: point.plotX + 102 - width / 2,
            y: this.chart.chartHeight + height + 1,
          };
        },
        formatter() {
          /**
           * Use renderToString() to render the JSX tooltip
           * component into a usable string for highcharts.
           */
          return ReactDOMServer.renderToString(
            <Tooltip points={this.points} date={this.x} />
          );
        },
      },
      responsive: {
        rules: [
          {
            chartOptions: {
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
