import humanizeDuration from 'humanize-duration';
import { memo } from 'react';
import styled, { css } from 'styled-components';

interface StepperProps {
  /** The description label above the stepper controls. */
  label: string;
  /** The parent controlled value that the stepper modifies. */
  value: number;
  /** The amount at which the step can change per click. */
  step: number;
  /** The minimum value that the stepper is allowed to go down to. */
  minimum: number;
  /** The type of stepper format. */
  type: 'time' | 'percent';
  /** The event triggered when the stepper changes from a click. */
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
  min-width: 120px;
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
  font-family: 'Roboto Mono', monospace;
`;

export const Stepper = memo(
  ({ label, value, step, type, minimum, onChange }: StepperProps) => {
    return (
      <div>
        <StyledLabel>{label}</StyledLabel>
        <StyledContent>
          <StyledButton
            onClick={() =>
              onChange(value === minimum ? value : value - 1 * step)
            }
          ></StyledButton>
          <StyledValue>
            {type === 'time'
              ? humanizeDuration(value, {
                  // Because of limited space, the stepper shows abbreviations for
                  // time based symbols. Also a custom delimiter and removal of a spacer.
                  largest: 2,
                  spacer: '',
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
              : `${value}%`}
          </StyledValue>
          <StyledButton
            plus
            onClick={() => onChange(value + 1 * step)}
          ></StyledButton>
        </StyledContent>
      </div>
    );
  }
);
