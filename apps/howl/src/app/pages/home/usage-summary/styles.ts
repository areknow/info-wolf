import styled from 'styled-components';

export const StyledActions = styled.div`
  display: flex;
  align-items: center;
  > *:not(:last-child) {
    margin-right: 10px;
  }
`;

export const StyledWarningIcon = styled.i<{ color: string }>`
  color: ${({ color }) => color};
`;

export const StyledMoreIcon = styled.i`
  --ggs: 0.85;
`;

export const StyledSteppers = styled.div`
  > *:first-child {
    margin-bottom: 20px;
  }
`;

export const StyledZoomButton = styled.button`
  all: unset;
  cursor: pointer;
  height: 24px;
  width: 24px;
  z-index: 1;
  justify-content: center;
  align-items: center;
  i {
    right: -3px;
  }
`;
