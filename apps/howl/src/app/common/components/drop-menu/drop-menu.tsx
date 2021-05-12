import { memo, ReactNode } from 'react';
import styled from 'styled-components';

interface DropMenuProps {
  /** Whether or not the drop menu is visible or hidden. */
  show: boolean;
  /** The icon in the drop menu button. */
  icon: ReactNode;
  /** The content of the drop menu. */
  children: ReactNode;
  /** The event fired when the drop menu button is clicked. */
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
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTooltip = styled.div`
  border-radius: 3px;
  position: absolute;
  padding: 10px;
  box-shadow: var(--shadow-2);
  background-color: var(--surface-2-color);
  top: 32px;
  right: -3px;
  z-index: unset;
  // Using a :before and :after approach to
  // styling the tooltip triangle indicator.
  // This is necessary since there is a shadow
  // on the drop menu and on the triangle.
  // z index stack 0: triangle with shadow
  // z index stack 1: drop menu with shadow
  // z index stack 2: triangle with no shadow
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

export const DropMenu = memo(
  ({ show, icon, children, onTriggerClick }: DropMenuProps) => {
    return (
      <StyledDropMenu>
        <StyledButton onClick={() => onTriggerClick()}>{icon}</StyledButton>
        {show && <StyledTooltip>{children}</StyledTooltip>}
      </StyledDropMenu>
    );
  }
);
