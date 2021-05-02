import { format } from 'date-fns';
import { TooltipFormatterContextObject } from 'highcharts';
import styled from 'styled-components';

const DATE_FORMAT = 'h:MM:SS';

interface TooltipProps {
  points: Array<TooltipFormatterContextObject>;
  date: number;
}

const StyledTooltip = styled.div`
  background-color: var(--background-color);
  color: var(--text-color);
  padding: 10px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.062);
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

export const Tooltip = ({ points, date }: TooltipProps) => {
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
};
