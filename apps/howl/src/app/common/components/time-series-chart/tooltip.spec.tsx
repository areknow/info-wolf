import { render } from '@testing-library/react';
import { format } from 'date-fns';
import { TooltipFormatterContextObject } from 'highcharts';
import { DATE_FORMAT, Tooltip } from './tooltip';

const mockPoints = ([
  {
    series: {
      name: 'foo',
    },
    y: 1,
  },
  {
    series: {
      name: 'bar',
    },
    y: 2,
  },
] as undefined) as Array<TooltipFormatterContextObject>;

describe('Tooltip', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Tooltip points={mockPoints} date={new Date().valueOf()} />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should show the point names', () => {
    const { queryByText } = render(
      <Tooltip points={mockPoints} date={new Date().valueOf()} />
    );
    for (const point of mockPoints) {
      expect(queryByText(point.series.name)).toBeTruthy();
    }
  });

  it('should show the point values', async () => {
    const { queryByText } = render(
      <Tooltip points={mockPoints} date={new Date().valueOf()} />
    );
    expect(queryByText(/01.00/i)).toBeTruthy();
    expect(queryByText(/02.00/i)).toBeTruthy();
  });

  it('should show the formatted date', async () => {
    const date = new Date().valueOf();
    const { queryByText } = render(<Tooltip points={mockPoints} date={date} />);
    expect(queryByText(format(date, DATE_FORMAT))).toBeTruthy();
  });
});
