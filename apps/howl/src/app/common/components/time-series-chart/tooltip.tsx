import { format } from 'date-fns';
import { TooltipFormatterContextObject } from 'highcharts';
import { memo } from 'react';
import styled from 'styled-components';

const DATE_FORMAT = 'h:MM:SS a';

interface TooltipProps {
  points: Array<TooltipFormatterContextObject>;
  date: number;
}

const StyledTooltip = styled.div`
  background-color: var(--surface-2-color);
  color: var(--text-color);
  padding: 10px;
  box-shadow: var(--shadow-2);
  font-family: 'Montserrat', sans-serif;
  span {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
  }
  div {
    font-size: 10px;
    padding: 2px 0;
  }
`;

export const Tooltip = memo(({ points, date }: TooltipProps) => {
  return (
    <StyledTooltip>
      <span>{format(date, DATE_FORMAT)}</span>
      {points.map((point, key) => (
        <div key={key}>
          {point.series.name}: {point.y}%
        </div>
      ))}
    </StyledTooltip>
  );
});
