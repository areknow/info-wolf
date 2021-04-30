import { ReactNode } from 'react';
import styled from 'styled-components';

interface GridRowProps {
  gap: number;
  children: ReactNode;
}

const StyledGridRow = styled.div<GridRowProps>`
  > *:not(:last-child) {
    margin-bottom: ${({ gap }) => gap}px;
  }
`;

export const GridRow = ({ gap, children }) => {
  return <StyledGridRow gap={gap}>{children}</StyledGridRow>;
};
