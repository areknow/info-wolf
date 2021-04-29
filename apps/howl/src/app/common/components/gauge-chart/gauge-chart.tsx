import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
import highchartsMore from 'highcharts/highcharts-more';
import solidGauge from 'highcharts/modules/solid-gauge';
import { memo } from 'react';
// import { chartCallback } from './chart-callback';
import Chart from 'react-apexcharts';

highchartsMore(Highcharts);
solidGauge(Highcharts);

interface GaugeChartProps {
  value: number;
  label: string;
}

export const GaugeChart = memo(({ value }: GaugeChartProps) => {
  // const options: Highcharts.Options = {
  //   chart: {
  //     type: 'solidgauge',
  //     height: 240,
  //     margin: 0,
  //     events: {
  //       render(chart) {
  //         // chartCallback(chart.target);
  //       },
  //     },
  //   },
  //   title: null,
  //   credits: {
  //     enabled: false,
  //   },
  //   pane: {
  //     startAngle: 0,
  //     endAngle: 360,
  //     background: [
  //       {
  //         backgroundColor: '#EEE',
  //         borderWidth: 0,
  //         outerRadius: '105%',
  //         innerRadius: '95%',
  //       },
  //     ],
  //   },
  //   exporting: {
  //     enabled: false,
  //   },
  //   yAxis: {
  //     min: 0,
  //     max: 100,
  //     lineWidth: 0,
  //     tickPositions: [],
  //     stops: [
  //       [0, '#56abfa'],
  //       [0.5, '#b680f3'],
  //       [1, '#e40d67'],
  //     ],
  //   },
  //   plotOptions: {
  //     solidgauge: {
  //       borderWidth: '10px',
  //       linecap: 'round',
  //       dataLabels: {
  //         useHTML: true,
  //         formatter() {
  //           return `
  //             <span>${this.y}</span>
  //             <span style="font-size: 20px"> %</span>
  //           `;
  //         },
  //         y: -40,
  //         x: 10,
  //         borderWidth: 0,
  //         style: {
  //           fontSize: '50px',
  //           fontFamily: 'Montserrat',
  //           fontWeight: 'light',
  //         },
  //       },
  //     },
  //   } as any,
  //   series: [
  //     {
  //       type: 'solidgauge',
  //       data: [
  //         {
  //           color: Highcharts.getOptions().colors[0],
  //           innerRadius: '100%',
  //           y: value,
  //         },
  //       ],
  //     },
  //   ],
  // };

  const series = [value];
  const options: ApexCharts.ApexOptions = {
    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 360,
        hollow: {
          margin: 0,
          size: '90%',
          background: '#fff',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 0,
            left: 0,
            blur: 10,
            opacity: 0.1,
          },
        },
        track: {
          background: '#fff',
          strokeWidth: '100%',
          margin: 0,
          dropShadow: {
            enabled: true,
            top: 0,
            left: 0,
            blur: 4,
            opacity: 0,
          },
        },
        dataLabels: {
          value: {
            offsetY: -5,
            formatter: function (val) {
              return `${val}%`;
            },
            color: '#111',
            fontSize: '30px',
            show: true,
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#ABE5A1'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: 'round',
    },
    labels: [''],
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Chart options={options} series={series} type="radialBar" width="280" />
    </div>
  );
});
