import styled from 'styled-components';

interface GapProps {
  gap: number;
}

const StyledGap = styled.div<GapProps>`
  display: flex;
  flex-direction: column;
  > *:not(:last-child) {
    margin-bottom: ${({ gap }) => gap}px;
  }
`;

export const Stack = ({ gap, children }) => {
  return <StyledGap gap={gap}>{children}</StyledGap>;
};
