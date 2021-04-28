import styled from 'styled-components';

const StyledCard = styled.div`
  border-radius: 3px;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 5px 5px rgba(0, 0, 0, 0.062);
  h3 {
    text-align: center;
  }
`;

const StyledContent = styled.div`
  margin-top: 20px;
`;

export const Card = ({ children, title }) => {
  return (
    <StyledCard>
      <h3>{title}</h3>
      <StyledContent>{children}</StyledContent>
    </StyledCard>
  );
};
