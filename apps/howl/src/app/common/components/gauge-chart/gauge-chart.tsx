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
      height: 170,
    },
    title: null,
    pane: {
      center: ['50%', '55%'],
      size: '120%',
      startAngle: -90,
      endAngle: 90,
      background: [
        {
          backgroundColor: '#EEE',
          innerRadius: '60%',
          outerRadius: '100%',
          shape: 'arc',
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
      tickAmount: 2,
      title: {
        text: null,
      },
      labels: {
        y: 16,
      },
      min: 0,
      max: 100,
    },
    plotOptions: {
      solidgauge: {
        dataLabels: {
          y: 15,
          borderWidth: 0,
          useHTML: true,
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
        data: [Number(value.toFixed(2))],
        dataLabels: {
          format: `
            <div style="text-align:center">
              <span style="font-size:25px">{y}%</span><br/>
              <span style="font-size:12px;opacity:0.4">${label}</span>
            </div>
            `,
        },
      },
    ],
  };
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
});
