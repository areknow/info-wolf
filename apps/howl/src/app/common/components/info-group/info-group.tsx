import { ReactNode } from 'react';
import styled from 'styled-components';

interface InfoGroupProps {
  label: string;
  content: ReactNode;
  icon?: string;
}

const StyledInfoGroup = styled.div`
  display: flex;
  i {
    font-size: 46px;
  }
  div {
    margin-left: 20px;
    h2 {
      margin-bottom: 4px;
      margin-top: 3px;
    }
    span {
      font-size: 12px;
    }
  }
`;

export const InfoGroup = ({ label, content, icon }: InfoGroupProps) => {
  return (
    <StyledInfoGroup>
      {icon && <i className="material-icons">{icon}</i>}
      <div>
        <h2>{content}</h2>
        <span>{label}</span>
      </div>
    </StyledInfoGroup>
  );
};
