import { format } from 'date-fns';
import { TooltipFormatterContextObject } from 'highcharts';
import { memo } from 'react';
import styled from 'styled-components';

const DATE_FORMAT = 'h:mm:ss a';

interface TooltipProps {
  points: Array<TooltipFormatterContextObject>;
  date: number;
}

const StyledTooltip = styled.div`
  border-radius: 3px;
  background-color: var(--surface-2-color);
  color: var(--text-color);
  padding: 10px;
  box-shadow: var(--shadow-2);
  font-family: 'Montserrat', sans-serif;
  span {
    font-family: 'Roboto Mono', monospace;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      font-size: 10px;
      padding: 2px 0;
    }
  }
`;

const StyledTitle = styled.div`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  font-family: 'Roboto Mono', monospace;
`;

export const Tooltip = memo(({ points, date }: TooltipProps) => {
  return (
    <StyledTooltip>
      <StyledTitle>{format(date, DATE_FORMAT)}</StyledTitle>
      <ul>
        {points.map((point, key) => (
          <li key={key}>
            {point.series.name}: <span>{point.y}%</span>
          </li>
        ))}
      </ul>
    </StyledTooltip>
  );
});
