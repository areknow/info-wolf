import Highcharts from 'highcharts';

// explain
export const chartCallback = (chart) => {
  const y = chart.series[0].data[0].y;
  for (let i = y; i >= 0; i = i - y / 80) {
    chart.addSeries(
      {
        data: [
          {
            y: i,
            radius: '100%',
            innerRadius: '100%',
          },
        ],
        stickyTracking: false,
        enableMouseTracking: false,
      },
      false
    );
  }
  chart.redraw();
  Highcharts.each(chart.series, function (s) {
    s.update(
      {
        borderColor: s.data[0].color,
      },
      false
    );
  });
  chart.redraw();
};
