import { memo } from 'react';
import Chart from 'react-apexcharts';

interface GaugeChartProps {
  series: { data: number[] }[];
  categories: string[];
}

export const BarChart = memo(({ series, categories }: GaugeChartProps) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
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
      categories,
      labels: {
        style: {
          fontFamily: 'Montserrat',
          fontSize: '10px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontFamily: 'Montserrat',
          fontSize: '10px',
        },
        formatter: function (val) {
          return (val / 60000).toFixed(0);
        },
      },
      title: {
        text: 'Minutes',
        style: {
          fontFamily: 'Montserrat',
          fontSize: '10px',
        },
      },
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
      fontFamily: 'Montserrat',
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
