import { memo } from 'react';
import Chart from 'react-apexcharts';

interface GaugeChartProps {
  series: { data: number[] }[]; // make type
  categories: string[];
}

export const BarChart = memo(({ series, categories }: GaugeChartProps) => {
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
      axisTicks: {
        height: 4,
      },
      categories,
      labels: {
        style: {
          fontSize: '10px',
        },
      },
    },
    yaxis: {
      tickAmount: 3,
      labels: {
        style: {
          fontSize: '10px',
        },
        formatter: function (val) {
          return (val / 60000).toFixed(0);
        },
      },
      title: {
        text: 'Minutes',
        style: {
          fontSize: '10px',
        },
      },
    },
    grid: {
      borderColor: '#E6E6E6',
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
