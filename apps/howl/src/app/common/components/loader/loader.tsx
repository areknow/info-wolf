import { memo } from 'react';
import styled from 'styled-components';

const StyledLoader = styled.div`
  width: 100%;
  margin: 0 0 2em;
  height: calc(100vh - 200px);
  text-align: center;
  padding: 1em;
  margin: 0 auto 1em;
  display: inline-block;
  vertical-align: top;
  display: flex;
  align-items: center;
  justify-content: center;
  fill: var(--text-color);
`;

export const Loader = memo(() => {
  return (
    <StyledLoader>
      <svg
        version="1.1"
        x="0px"
        y="0px"
        width="40px"
        height="40px"
        viewBox="0 0 50 50"
      >
        <path d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </StyledLoader>
  );
});
