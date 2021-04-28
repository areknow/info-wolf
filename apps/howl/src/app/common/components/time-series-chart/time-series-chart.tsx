import { format } from 'date-fns';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

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
      text: null,
    },
    subtitle: {
      text: null,
    },
    legend: {
      enabled: false,
    },
    yAxis: {
      title: {
        text: null,
      },
      labels: {
        formatter() {
          return `${this.value}%`;
        },
      },
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        hour: '%l %p',
        minute: '%l:%M %p',
        second: '%l:%M:%S %p',
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
