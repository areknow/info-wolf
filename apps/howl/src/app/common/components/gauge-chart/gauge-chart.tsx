import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMore from 'highcharts/highcharts-more';
import solidGauge from 'highcharts/modules/solid-gauge';
import { memo } from 'react';
import { chartCallback } from './chart-callback';

highchartsMore(Highcharts);
solidGauge(Highcharts);

interface GaugeChartProps {
  value: number;
  label: string;
}

export const GaugeChart = memo(({ value }: GaugeChartProps) => {
  const options: Highcharts.Options = {
    chart: {
      type: 'solidgauge',
      height: 240,
      margin: 0,
    },
    title: null,
    credits: {
      enabled: false,
    },
    pane: {
      startAngle: 0,
      endAngle: 360,
      background: [
        {
          backgroundColor: '#EEE',
          borderWidth: 0,
          outerRadius: '105%',
          innerRadius: '95%',
        },
      ],
    },
    exporting: {
      enabled: false,
    },
    yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,
      tickPositions: [],
      stops: [
        [0, '#56abfa'],
        [0.5, '#b680f3'],
        [1, '#e40d67'],
      ],
    },
    plotOptions: {
      solidgauge: {
        borderWidth: '10px',
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
          x: 10,
          borderWidth: 0,
          style: {
            fontSize: '50px',
            fontFamily: 'Montserrat',
            fontWeight: 'light',
          },
        },
      },
    } as any,
    series: [
      {
        type: 'solidgauge',
        data: [
          {
            color: Highcharts.getOptions().colors[0],
            innerRadius: '100%',
            y: Number(value.toFixed(1)),
          },
        ],
      },
    ],
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        callback={chartCallback}
      />
    </div>
  );
});
