import { memo, ReactNode } from 'react';
import styled from 'styled-components';
import { DARK_THEME, LIGHT_THEME } from '../../colors';
import { useDarkModeContext } from '../../context';
import { Colors } from '../../types';

interface CardProps {
  /** The title label of the card. */
  title?: string;
  /** The content of the card. */
  children: ReactNode;
  /** Any actions of the card that will be displayed in the right corner. */
  actions?: ReactNode;
  /** Whether or not a blur layer overlay should be shown. Used when an action is triggered. */
  overlayOpen?: boolean;
  /** Event that is fired when the overlay layer is clicked. Used to close overlay from parent. */
  onOverlayClick?: () => void;
}

const StyledActions = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
`;

const StyledCard = styled.div<{ overlayOpen: boolean }>`
  position: relative;
  min-height: 100px;
  border-radius: 3px;
  padding: 24px 30px;
  background-color: var(--surface-1-color);
  box-shadow: var(--shadow-1);
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

const StyledOverlay = styled.div<{ colors: Colors }>`
  position: absolute;
  content: '';
  background-color: ${({ colors }) => colors.chart.selection};
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  z-index: 1;
  border-radius: 3px;
  backdrop-filter: blur(2px);
`;

const StyledContent = styled.div`
  margin-top: 40px;
  @media (max-width: 600px) {
    margin-top: 20px;
  }
`;

export const Card = memo(
  ({ children, title, actions, overlayOpen, onOverlayClick }: CardProps) => {
    const { dark } = useDarkModeContext();
    const colors = dark ? DARK_THEME : LIGHT_THEME;

    return (
      <StyledCard overlayOpen={overlayOpen}>
        {overlayOpen && (
          <StyledOverlay
            data-testid="card-overlay"
            colors={colors}
            onClick={() => onOverlayClick()}
          />
        )}
        <StyledActions>{actions}</StyledActions>
        {title && <h3>{title}</h3>}
        <StyledContent>{children}</StyledContent>
      </StyledCard>
    );
  }
);
