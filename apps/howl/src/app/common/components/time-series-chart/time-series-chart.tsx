import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { memo } from 'react';
import ReactDOMServer from 'react-dom/server';
import { DARK_THEME, LIGHT_THEME } from '../../colors';
import { useDarkModeContext } from '../../context';
import { configureLegendSymbols } from './legend-symbol';
import { Tooltip } from './tooltip';

declare const window: Window & {
  configureLegendSymbols: typeof configureLegendSymbols;
};
window.configureLegendSymbols = configureLegendSymbols;

interface TimeSeriesChartProps {
  data: Highcharts.SeriesOptionsType[];
}

export const TimeSeriesChart = memo(({ data }: TimeSeriesChartProps) => {
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
    },
    yAxis: {
      gridLineColor: colors.chart.border,
      tickInterval: 30,
      title: {
        text: null,
      },
      labels: {
        style: {
          color: colors.chart.text,
          fontFamily: 'Montserrat',
          fontSize: '10px',
        },
        formatter() {
          return `${this.value}%`;
        },
      },
    },
    xAxis: {
      lineColor: colors.chart.border,
      crosshair: {
        width: 1,
        color: colors.chart.border,
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
          fontFamily: 'Montserrat',
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
      positioner(_width, _height, point) {
        // Position the tooltip...
        return { x: point.plotX + 104, y: 162 };
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
    series: data,
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
});
