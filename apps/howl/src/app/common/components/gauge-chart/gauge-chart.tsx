import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMore from 'highcharts/highcharts-more';
import solidGauge from 'highcharts/modules/solid-gauge';
import { memo } from 'react';

highchartsMore(Highcharts);
solidGauge(Highcharts);

interface GaugeChartProps {
  value: number;
  label: string;
}

export const GaugeChart = memo(({ value, label }: GaugeChartProps) => {
  const options: Highcharts.Options = {
    chart: {
      type: 'solidgauge',
      height: 240,
      margin: 0,
      marginTop: -18,
      marginBottom: -18,
    },
    title: null,
    pane: {
      startAngle: 0,
      endAngle: 360,
      background: [
        {
          backgroundColor: '#EEE',
          borderWidth: 0,
          outerRadius: '100%',
          innerRadius: '90%',
        },
      ],
    },
    exporting: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    yAxis: {
      stops: [
        [0.1, '#55BF3B'],
        [0.5, '#DDDF0D'],
        [0.9, '#DF5353'],
      ],
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickAmount: 1,
      title: {
        text: null,
      },
      labels: {
        enabled: false,
      },
      min: 0,
      max: 100,
    },
    plotOptions: {
      solidgauge: {
        linecap: 'round',
        dataLabels: {
          useHTML: true,
          formatter() {
            return `
            <span>${this.y}</span>
            <span style="font-size: 20px"> %</span>
            `;
          },
          y: -40,
          borderWidth: 0,
          style: {
            fontSize: '50px',
            fontFamily: 'Montserrat',
            fontWeight: 'light',
          },
        },
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        type: 'solidgauge',
        name: 'Speed',
        data: [
          {
            radius: '100%',
            innerRadius: '90%',
            y: Number(value.toFixed(1)),
          },
        ],
      },
    ],
  };
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
});
