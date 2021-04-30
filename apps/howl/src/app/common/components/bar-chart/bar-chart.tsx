import { memo } from 'react';
import Chart from 'react-apexcharts';
import { useDarkModeContext } from '../../context';

interface GaugeChartProps {
  series: { data: number[] }[]; // make type
  categories: string[];
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

export const BarChart = memo(({ series, categories }: GaugeChartProps) => {
  const { dark } = useDarkModeContext();
  const colors = COLORS[dark ? 'dark' : 'light'];

  const options: ApexCharts.ApexOptions = {
    chart: {
      fontFamily: 'Montserrat',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    colors: ['#8293D2', '#e4c40d', '#0de480'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '100%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      axisBorder: {
        color: colors.border,
      },
      axisTicks: {
        height: 4,
        color: colors.border,
      },
      categories,
      labels: {
        style: {
          colors: colors.text,
          fontSize: '10px',
        },
      },
    },
    yaxis: {
      tickAmount: 3,
      labels: {
        style: {
          colors: colors.text,
          fontSize: '10px',
        },
        formatter: function (val) {
          return (val / 60000).toFixed(0);
        },
      },
      title: {
        text: 'Minutes',
        style: {
          color: colors.text,
          fontSize: '10px',
        },
      },
    },
    grid: {
      borderColor: colors.border,
    },
    legend: {
      itemMargin: {
        vertical: 15,
      },
      markers: {
        width: 8,
        height: 8,
        radius: 0,
      },
      fontWeight: 'bold',
      fontSize: '10px',
      labels: {
        colors: [colors.label],
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return (val / 60000).toFixed(0);
        },
      },
    },
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Chart
        options={options}
        series={series}
        type="bar"
        width="100%"
        height="240"
      />
    </div>
  );
});
