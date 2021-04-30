import { memo } from 'react';
import Chart from 'react-apexcharts';

interface GaugeChartProps {
  value: number;
  label: string;
}

export const GaugeChart = memo(({ value, label }: GaugeChartProps) => {
  const series = [value];
  const options: ApexCharts.ApexOptions = {
    colors: ['#7F92D7'],
    chart: {
      fontFamily: 'Montserrat',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
        dataLabels: {
          value: {
            offsetY: -10,
            formatter: function (val) {
              return `${val}%`;
            },
            color: '#111',
            fontSize: '28px',
            show: true,
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#e40d67'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: 'round',
    },
    title: {
      text: label,
      align: 'center',
      floating: true,
      offsetY: 120,
      style: {
        fontSize: '10px',
        color: '#adadad',
      },
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
      <Chart options={options} series={series} type="radialBar" height="220" />
    </div>
  );
});
