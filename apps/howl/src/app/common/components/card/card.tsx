import styled from 'styled-components';

const StyledCard = styled.div`
  min-height: 100px;
  border-radius: 3px;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.062);
  h3 {
    text-align: center;
    color: #3d3d3d;
    position: relative;
    text-transform: uppercase;
    &:after {
      content: '';
      position: absolute;
      height: 2px;
      background-color: #e6e6e6;
      width: 20px;
      top: 30px;
      left: 0;
      right: 0;
      margin: auto;
    }
  }
`;

const StyledContent = styled.div`
  margin-top: 50px;
`;

export const Card = ({ children, title }) => {
  return (
    <StyledCard>
      <h3>{title}</h3>
      <StyledContent>{children}</StyledContent>
    </StyledCard>
  );
};
