import { memo, ReactNode } from 'react';
import styled from 'styled-components';

interface InfoGroupProps {
  label: string;
  content: ReactNode;
  icon?: ReactNode;
}

const StyledInfoGroup = styled.div`
  display: flex;
  div {
    h2 {
      margin-bottom: 4px;
    }
    span {
      font-size: 12px;
    }
  }
`;

const StyledIcon = styled.div`
  margin-right: 20px;
  svg {
    width: 40px;
    height: 40px;
    fill: var(--text-color);
  }
`;

export const InfoGroup = memo(({ label, content, icon }: InfoGroupProps) => {
  return (
    <StyledInfoGroup>
      {icon && <StyledIcon>{icon}</StyledIcon>}
      <div>
        <h2>{content}</h2>
        <span>{label}</span>
      </div>
    </StyledInfoGroup>
  );
});
