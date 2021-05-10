import { memo } from 'react';
import Chart from 'react-apexcharts';
import { DARK_THEME, LIGHT_THEME } from '../../colors';
import { useDarkModeContext } from '../../context';

interface GaugeChartProps {
  value: number;
  label: string;
  themeNumber: number;
}

export const GaugeChart = memo(
  ({ value, label, themeNumber }: GaugeChartProps) => {
    const { dark } = useDarkModeContext();
    const colors = dark ? DARK_THEME : LIGHT_THEME;

    const series = [value];

    const options: ApexCharts.ApexOptions = {
      chart: {
        fontFamily: 'Roboto Mono',
      },
      plotOptions: {
        radialBar: {
          track: {
            background: colors.chart.border,
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
              color: colors.chart.label,
              fontSize: '28px',
              show: true,
            },
          },
        },
      },
      colors: [colors[`theme${themeNumber}`]],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: [colors.theme2],
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
          fontFamily: 'Montserrat',
          fontSize: '10px',
          color: colors.chart.text,
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
        <Chart
          options={options}
          series={series}
          type="radialBar"
          height="220"
        />
      </div>
    );
  }
);
