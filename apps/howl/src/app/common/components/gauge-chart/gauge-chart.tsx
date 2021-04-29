import Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
import solidGauge from 'highcharts/modules/solid-gauge';
import { memo } from 'react';
import Chart from 'react-apexcharts';

highchartsMore(Highcharts);
solidGauge(Highcharts);

interface GaugeChartProps {
  value: number;
}

export const GaugeChart = memo(({ value }: GaugeChartProps) => {
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
