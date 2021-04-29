import { format } from 'date-fns';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// props and memo
export const TimeSeriesChart = ({ data }) => {
  const options: Highcharts.Options = {
    scrollbar: {
      enabled: true,
    },
    chart: {
      animation: false,
      zoomType: 'x',
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
      itemStyle: {
        fontFamily: 'Montserrat',
        fontSize: '10px',
      },
    },
    yAxis: {
      title: {
        text: null,
      },
      labels: {
        style: {
          fontFamily: 'Montserrat',
        },
        formatter() {
          return `${this.value}%`;
        },
      },
    },
    xAxis: {
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
      labels: {
        style: {
          fontSize: '10px',
          fontFamily: 'Montserrat',
        },
      },
    },
    plotOptions: {
      series: {
        // color: {
        //   linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
        //   stops: [
        //     [0, '#003399'],
        //     [1, '#3366AA'],
        //   ],
        // },
        animation: false,
        marker: {
          enabled: false,
          symbol: 'circle',
          color: 'blue',
        },
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
};
