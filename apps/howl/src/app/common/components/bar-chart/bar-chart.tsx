import { memo } from 'react';
import Chart from 'react-apexcharts';
import { DARK_THEME, LIGHT_THEME } from '../../colors';
import { useDarkModeContext } from '../../context';

interface GaugeChartProps {
  series: { data: number[] }[];
  categories: string[];
}

export const BarChart = memo(({ series, categories }: GaugeChartProps) => {
  const { dark } = useDarkModeContext();
  const colors = dark ? DARK_THEME : LIGHT_THEME;

  const options: ApexCharts.ApexOptions = {
    chart: {
      fontFamily: 'Montserrat',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    colors: [colors.theme4, colors.theme2, colors.theme5],
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
        color: colors.chart.border,
      },
      axisTicks: {
        height: 4,
        color: colors.chart.border,
      },
      categories,
      labels: {
        style: {
          colors: colors.chart.text,
          fontSize: '10px',
        },
      },
    },
    yaxis: {
      tickAmount: 3,
      labels: {
        style: {
          colors: colors.chart.text,
          fontSize: '10px',
        },
        formatter: function (val) {
          return (val / 60000).toFixed(0);
        },
      },
      title: {
        text: 'Minutes',
        style: {
          color: colors.chart.text,
          fontSize: '10px',
        },
      },
    },
    grid: {
      borderColor: colors.chart.border,
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
        colors: [colors.chart.label],
      },
    },
    tooltip: {
      enabled: false,
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
