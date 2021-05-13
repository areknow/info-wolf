import { fireEvent, render } from '@testing-library/react';
import { Card } from './card';

describe('Card', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Card>foo</Card>);
    expect(baseElement).toBeTruthy();
  });

  it('should show title', () => {
    const title = 'foo';
    const { queryByText } = render(<Card title={title}>bar</Card>);
    expect(queryByText(title)).toBeTruthy();
  });

  it('should show content', () => {
    const content = 'foo';
    const { queryByText } = render(<Card>{content}</Card>);
    expect(queryByText(content)).toBeTruthy();
  });

  it('should show actions', () => {
    const actions = 'foo';
    const { queryByText } = render(<Card actions={actions}>bar</Card>);
    expect(queryByText(actions)).toBeTruthy();
  });

  it('should not show overlay by default', () => {
    const { queryByTestId } = render(<Card>foo</Card>);
    expect(queryByTestId('card-overlay')).not.toBeTruthy();
  });

  it('should show overlay when true', () => {
    const { queryByTestId } = render(<Card overlayOpen>foo</Card>);
    expect(queryByTestId('card-overlay')).toBeTruthy();
  });

  it('should fire overlay click event', async () => {
    let overlayHasBeenClicked = false;
    const { queryByTestId } = render(
      <Card
        overlayOpen
        onOverlayClick={() => {
          overlayHasBeenClicked = true;
        }}
      >
        foo
      </Card>
    );
    fireEvent.click(queryByTestId('card-overlay'));
    expect(overlayHasBeenClicked).toEqual(true);
  });
});
