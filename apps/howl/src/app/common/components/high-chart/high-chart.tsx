import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export const HighChart = () => {
  const data = [
    [1167609600000, 0.7537],
    [1167696000000, 0.7537],
    [1167782400000, 0.7559],
    [1167868800000, 0.7631],
    [1167955200000, 0.7644],
    [1168214400000, 0.769],
    [1168300800000, 0.7683],
    [1168387200000, 0.77],
    [1168473600000, 0.7703],
    [1168560000000, 0.7757],
  ];

  const options = {
    chart: {
      zoomType: 'x',
    },
    title: {
      text: 'USD to EUR exchange rate over time',
    },
    subtitle: {
      text:
        document.ontouchstart === undefined
          ? 'Click and drag in the plot area to zoom in'
          : 'Pinch the chart to zoom in',
    },
    xAxis: {
      type: 'datetime',
    },
    yAxis: {
      title: {
        text: 'Exchange rate',
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[0])
                .setOpacity(0)
                .get('rgba'),
            ],
          ],
        },
        marker: {
          radius: 2,
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
      },
    },

    series: [
      {
        type: 'area',
        name: 'USD to EUR',
        data: data,
      },
    ],
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
