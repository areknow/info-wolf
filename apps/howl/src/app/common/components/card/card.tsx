import { ReactNode } from 'react';
import styled from 'styled-components';

interface CardProps {
  title?: string;
  children: ReactNode;
}

const StyledCard = styled.div`
  min-height: 100px;
  border-radius: 3px;
  padding: 30px;
  background-color: #ffffff;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.062);
  h3 {
    text-align: center;
    color: #3d3d3d;
    text-transform: uppercase;
    font-size: 14px;
  }
`;

const StyledContent = styled.div`
  margin-top: 40px;
`;

export const Card = ({ children, title }: CardProps) => {
  return (
    <StyledCard>
      {title && <h3>{title}</h3>}
      <StyledContent>{children}</StyledContent>
    </StyledCard>
  );
};
