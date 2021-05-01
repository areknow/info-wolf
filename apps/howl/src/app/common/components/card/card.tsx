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
  background-color: var(--surface-color);
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.062);
  h3 {
    text-align: center;
    color: var(--text-color);
    text-transform: uppercase;
    font-size: 14px;
    opacity: 0.8;
  }
  @media (max-width: 600px) {
    padding: 20px 10px 10px 10px;
  }
`;

const StyledContent = styled.div`
  margin-top: 40px;
  @media (max-width: 600px) {
    margin-top: 20px;
  }
`;

export const Card = ({ children, title }: CardProps) => {
  return (
    <StyledCard>
      {title && <h3>{title}</h3>}
      <StyledContent>{children}</StyledContent>
    </StyledCard>
  );
};
