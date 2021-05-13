import { memo } from 'react';
import styled from 'styled-components';
import { ReactComponent as Coding } from '../../../../assets/coding.svg';
import { InfoGroup } from '../info-group/info-group';

const StyledError = styled.div`
  width: 100%;
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 200px);
`;

export const Error = memo(() => {
  return (
    <StyledError data-testid="error">
      <InfoGroup
        icon={<Coding />}
        label="Please refresh the page and try again."
        content="Something went wrong"
      />
    </StyledError>
  );
});
