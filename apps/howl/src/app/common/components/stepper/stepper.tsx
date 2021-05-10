import humanizeDuration from 'humanize-duration';
import styled, { css } from 'styled-components';

interface StepperProps {
  label: string;
  value: number;
  step: number;
  type: 'time' | 'percent';
  onChange: (value: number) => void;
}

const StyledLabel = styled.div`
  display: block;
  font-size: 10px;
`;

const StyledContent = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  min-width: 110px;
`;

const StyledButton = styled.button<{ plus?: boolean }>`
  all: unset;
  height: 15px;
  width: 15px;
  border: 1px solid var(--text-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }
  &:before {
    width: 7px;
    height: 1px;
    background-color: var(--text-color);
  }
  ${({ plus }) =>
    plus &&
    css`
      &:after {
        height: 7px;
        width: 1px;
        background-color: var(--text-color);
      }
    `}
`;

const StyledValue = styled.div`
  font-weight: bold;
`;

export const Stepper = ({
  label,
  value,
  step,
  type,
  onChange,
}: StepperProps) => {
  return (
    <div>
      <StyledLabel>{label}</StyledLabel>
      <StyledContent>
        <StyledButton
          onClick={() => onChange(value > 0 ? value - 1 * step : value)}
        ></StyledButton>
        <StyledValue>
          {type === 'time' ? (
            humanizeDuration(value, {
              largest: 2,
              delimiter: ', ',
              language: 'shortEn',
              languages: {
                shortEn: {
                  m: () => 'm',
                  s: () => 's',
                  ms: () => 'ms',
                },
              },
            })
          ) : (
            <>{value}%</>
          )}
        </StyledValue>
        <StyledButton
          plus
          onClick={() => onChange(value + 1 * step)}
        ></StyledButton>
      </StyledContent>
    </div>
  );
};
