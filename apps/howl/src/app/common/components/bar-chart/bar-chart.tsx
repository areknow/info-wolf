import { memo } from 'react';
import Chart from 'react-apexcharts';

interface GaugeChartProps {
  data: number[];
  categories: string[];
}

export const BarChart = memo(({ data, categories }: GaugeChartProps) => {
  const series = [
    {
      data,
    },
  ];
  const options: ApexCharts.ApexOptions = {
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories,
      labels: {
        style: {
          // colors: colors,
          fontSize: '12px',
        },
      },
    },
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
      <Chart options={options} series={series} type="bar" height="220" />
    </div>
  );
});
