import { format } from 'date-fns';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { memo } from 'react';
import { configureLegendSymbols } from './legend-symbol';

declare const window: Window & {
  configureLegendSymbols: typeof configureLegendSymbols;
};
window.configureLegendSymbols = configureLegendSymbols;

interface TimeSeriesChartProps {
  data: Highcharts.SeriesOptionsType[];
}

export const TimeSeriesChart = memo(({ data }: TimeSeriesChartProps) => {
  const options: Highcharts.Options = {
    scrollbar: {
      enabled: true,
    },
    chart: {
      animation: false,
      zoomType: 'x',
      selectionMarkerFill: 'rgba(0, 0, 0, 0.1)',
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
        fontFamily: 'Montserrat',
        fontSize: '10px',
      },
    },
    yAxis: {
      tickInterval: 30,
      title: {
        text: null,
      },
      labels: {
        style: {
          fontFamily: 'Montserrat',
          fontSize: '10px',
        },
        formatter() {
          return `${this.value}%`;
        },
      },
    },
    xAxis: {
      lineColor: '#E6E6E6',
      crosshair: {
        width: 1,
        color: '#E6E6E6',
      },
      type: 'datetime',
      dateTimeLabelFormats: {
        hour: '%l %p',
        minute: '%l:%M %p',
        second: '%l:%M:%S %p',
      },
      tickLength: 4,
      tickColor: '#E6E6E6',
      labels: {
        style: {
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
      formatter() {
        return `
          <div>${this.series.name}</div>
          <div>${format(this.x, 'MMM, dd YYY')}</div>
          <div>${this.y.toFixed(2)}%</div>
        `;
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
