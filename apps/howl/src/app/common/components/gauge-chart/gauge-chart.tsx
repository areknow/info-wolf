import { memo } from 'react';
import Chart from 'react-apexcharts';
import { useDarkModeContext } from '../../context';

interface GaugeChartProps {
  value: number;
  label: string;
}

const COLORS = {
  light: {
    border: '#E6E6E6',
    text: '#999999',
    label: '#5a5a5a',
  },
  dark: {
    border: '#404661',
    text: '#6c7291',
    label: '#939ab9',
  },
};

export const GaugeChart = memo(({ value, label }: GaugeChartProps) => {
  const { dark } = useDarkModeContext();
  const colors = COLORS[dark ? 'dark' : 'light'];

  const series = [value];

  const options: ApexCharts.ApexOptions = {
    colors: ['#7F92D7'],
    chart: {
      fontFamily: 'Montserrat',
    },
    plotOptions: {
      radialBar: {
        track: {
          background: colors.border,
        },
        hollow: {
          size: '70%',
        },
        dataLabels: {
          value: {
            offsetY: -10,
            formatter: function (val) {
              return `${val}%`;
            },
            color: colors.label,
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
        color: colors.text,
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
