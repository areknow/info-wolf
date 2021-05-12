import { memo } from 'react';
import Chart from 'react-apexcharts';
import { DARK_THEME, LIGHT_THEME } from '../../colors';
import { useDarkModeContext } from '../../context';

interface PieChartProps {
  /** The data series used to display the pie slices in the chart. */
  series: number[];
  /** The legend labels for each series in the pie chart. */
  labels: string[];
}

export const PieChart = memo(({ series, labels }: PieChartProps) => {
  const { dark } = useDarkModeContext();
  const colors = dark ? DARK_THEME : LIGHT_THEME;

  const options: ApexCharts.ApexOptions = {
    chart: {
      fontFamily: 'Roboto Mono',
      animations: {
        enabled: false,
        dynamicAnimation: {
          enabled: false,
        },
      },
    },
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
        // Format the value in the pie slice by converting to a GB value
        // and removing any decimal points because of limited space.
        return (
          (opt.w.globals.series[opt.seriesIndex] / 1024).toFixed(0) + ' GB'
        );
      },
    },
    tooltip: {
      enabled: false,
    },
    legend: {
      position: 'bottom',
      markers: {
        width: 8,
        height: 8,
      },
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      fontSize: '10px',
      labels: {
        colors: [colors.chart.label],
      },
    },
    stroke: {
      colors: [colors.surface1],
    },
    colors: [colors.theme4, colors.theme3],
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
