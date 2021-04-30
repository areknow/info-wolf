import { ReactNode } from 'react';
import styled from 'styled-components';

interface GridProps {
  gap: number;
  templateColumns: string;
  children: ReactNode;
}

const StyledGrid = styled.div<Pick<GridProps, 'gap' | 'templateColumns'>>`
  display: grid;
  grid-template-columns: ${({ templateColumns }) => templateColumns};
  gap: ${({ gap }) => gap}px;
`;

export const Grid = ({ gap, templateColumns, children }: GridProps) => {
  return (
    <StyledGrid gap={gap} templateColumns={templateColumns}>
      {children}
    </StyledGrid>
  );
};
