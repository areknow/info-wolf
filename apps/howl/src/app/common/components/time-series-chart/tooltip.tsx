import { format } from 'date-fns';
import { TooltipFormatterContextObject } from 'highcharts';
import { memo } from 'react';
import styled from 'styled-components';

const DATE_FORMAT = 'h:mm:ss a';

interface TooltipProps {
  /** The point values for each series from highcharts. */
  points: Array<TooltipFormatterContextObject>;
  /** The date value of the current hovered point. */
  date: number;
}

const StyledTooltip = styled.div`
  border-radius: 3px;
  background-color: var(--surface-2-color);
  color: var(--text-color);
  padding: 10px;
  box-shadow: var(--shadow-2);
  font-family: 'Montserrat', sans-serif;
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

const StyledKeyValue = styled.div`
  width: 150px;
  display: flex;
  span {
    flex-grow: 1;
    border-bottom: 1px dotted var(--text-color);
    opacity: 0.2;
  }
`;

const StyledKeyValueValue = styled.div`
  font-family: 'Roboto Mono', monospace;
`;

export const Tooltip = memo(({ points, date }: TooltipProps) => {
  return (
    <StyledTooltip>
      <StyledTitle>{format(date, DATE_FORMAT)}</StyledTitle>
      <ul>
        {points.map((point, key) => (
          <li key={key}>
            <StyledKeyValue>
              <div>{point.series.name}</div>
              <span></span>
              <StyledKeyValueValue>
                {/* Format the value with leading zeros and percent sign. */}
                {point.y.toFixed(2).padStart(5, '0')}%
              </StyledKeyValueValue>
            </StyledKeyValue>
          </li>
        ))}
      </ul>
    </StyledTooltip>
  );
});
