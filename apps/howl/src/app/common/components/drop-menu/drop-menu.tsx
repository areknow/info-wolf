import { ReactNode } from 'react';
import styled from 'styled-components';

interface DropMenuProps {
  show: boolean;
  icon: ReactNode;
  children: ReactNode;
  onTriggerClick: () => void;
}

const StyledDropMenu = styled.div`
  position: relative;
  z-index: 1;
`;

const StyledButton = styled.button`
  all: unset;
  cursor: pointer;
  height: 24px;
  width: 24px;
`;

const StyledTooltip = styled.div`
  border-radius: 3px;
  position: absolute;
  padding: 10px;
  box-shadow: var(--shadow-2);
  background-color: var(--surface-2-color);
  top: 30px;
  right: -5px;
  z-index: unset;
  &:before,
  &:after {
    content: '';
    top: -5px;
    right: 10px;
    color: var(--text-color);
    background-color: var(--surface-2-color);
    width: 10px;
    height: 10px;
    position: absolute;
    transform: rotate(45deg);
  }
  &:before {
    box-shadow: var(--shadow-2);
    z-index: -1;
  }
`;

export const DropMenu = ({
  show,
  icon,
  children,
  onTriggerClick,
}: DropMenuProps) => {
  return (
    <StyledDropMenu>
      <StyledButton onClick={() => onTriggerClick()}>{icon}</StyledButton>
      {show && <StyledTooltip>{children}</StyledTooltip>}
    </StyledDropMenu>
  );
};
