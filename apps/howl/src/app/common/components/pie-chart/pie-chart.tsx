import { memo } from 'react';
import Chart from 'react-apexcharts';
import { useDarkModeContext } from '../../context';

interface PieChartProps {
  series: number[];
  labels: string[];
}

const COLORS = {
  light: {
    background: '#ffffff',
    label: '#5a5a5a',
  },
  dark: {
    background: '#282c47',
    label: '#939ab9',
  },
};

export const PieChart = memo(({ series, labels }: PieChartProps) => {
  const { dark } = useDarkModeContext();
  const colors = COLORS[dark ? 'dark' : 'light'];

  const options: ApexCharts.ApexOptions = {
    chart: {
      fontFamily: 'Montserrat',
      animations: {
        enabled: false,
        dynamicAnimation: {
          enabled: false,
        },
      },
    },
    colors: ['#0de480', '#7F92D7'],
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
        expandOnClick: false,
        dataLabels: {
          offset: -14,
        },
      },
    },
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false,
      },
      formatter(_, opt) {
        return (
          (opt.w.globals.series[opt.seriesIndex] / 1024).toFixed(0) + ' GB'
        );
      },
    },
    legend: {
      position: 'bottom',
      markers: {
        width: 8,
        height: 8,
      },
      fontWeight: 'bold',
      fontSize: '10px',
      labels: {
        colors: [colors.label],
      },
    },
    stroke: {
      colors: [colors.background],
    },
    fill: {
      type: 'gradient',
      gradient: {
        gradientToColors: ['#7F92D7'],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
      },
    },
    labels,
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
      <Chart options={options} series={series} type="pie" height="245" />
    </div>
  );
});
