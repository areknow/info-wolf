import { format } from 'date-fns';
import styled from 'styled-components';
import { DARK_THEME, LIGHT_THEME } from '../../../common/colors';
import { useDarkModeContext } from '../../../common/context';
import { PlotBand } from '../../../common/types';
import { DATE_FORMAT } from './constants';

interface WarningsProps {
  bands: PlotBand[];
  recovered: PlotBand[];
}

const StyledWarnings = styled.div`
  min-width: 250px;
  span {
    display: block;
    font-size: 10px;
  }
  ul {
    font-family: 'Roboto Mono', monospace;
    list-style: none;
    margin: 10px 0 20px 0;
    padding: 0;
    max-height: 180px;
    overflow-y: auto;
    &:last-child {
      margin-bottom: 0;
    }
    li {
      height: 30px;
      padding: 4px;
      display: flex;
      align-items: center;
      &:nth-child(odd) {
        background: hsla(0, 0%, 50%, 0.05);
      }
      i {
        margin-right: 10px;
        --ggs: 0.7;
      }
    }
  }
`;

export const Warnings = ({ bands, recovered }: WarningsProps) => {
  const { dark } = useDarkModeContext();
  const colors = dark ? DARK_THEME : LIGHT_THEME;

  return (
    <StyledWarnings>
      <span>
        CPU threshold currently violated {bands.length} time
        {bands.length !== 1 && 's'}
      </span>
      <ul>
        {bands.map((band, key) => (
          <li key={key}>
            <i className="gg-danger" style={{ color: colors.theme6 }}></i>
            {format(band.from, DATE_FORMAT)} - {format(band.to, DATE_FORMAT)}
          </li>
        ))}
      </ul>
      {recovered.length > 0 && (
        <>
          <span>
            CPU violation historically recovered {recovered.length} time
            {recovered.length !== 1 && 's'}
          </span>
          <ul>
            {recovered.slice().map((item, key) => (
              <li key={key}>
                <i className="gg-check-o" style={{ color: colors.theme4 }}></i>
                {format(item.to, DATE_FORMAT)}
              </li>
            ))}
          </ul>
        </>
      )}
    </StyledWarnings>
  );
};
