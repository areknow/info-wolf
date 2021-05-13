import { fireEvent, render } from '@testing-library/react';
import { useState } from 'react';
import { DropMenu } from './drop-menu';

describe('DropMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <DropMenu show icon={<i />} onTriggerClick={jest.fn()}>
        foo
      </DropMenu>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should show content', () => {
    const content = 'foo';
    const { queryByText } = render(
      <DropMenu show icon={<i />} onTriggerClick={jest.fn()}>
        {content}
      </DropMenu>
    );
    expect(queryByText(content)).toBeTruthy();
  });

  it('should show icon', () => {
    const content = 'foo';
    const { queryByTestId } = render(
      <DropMenu
        show
        icon={<i data-testid="mock-icon" />}
        onTriggerClick={jest.fn()}
      >
        {content}
      </DropMenu>
    );
    expect(queryByTestId('mock-icon')).toBeTruthy();
  });

  it('should not show content when `show` is false', () => {
    const content = 'foo';
    const { queryByText } = render(
      <DropMenu show={false} icon={<i />} onTriggerClick={jest.fn()}>
        {content}
      </DropMenu>
    );
    expect(queryByText(content)).not.toBeTruthy();
  });

  it('should show content after click updates state', () => {
    const content = 'foo';
    const mockButton = 'mock-button';
    const Mock = () => {
      const [show, setShow] = useState(false);
      return (
        <>
          <DropMenu show={show} icon={<i />} onTriggerClick={jest.fn()}>
            {content}
          </DropMenu>
          <button data-testid={mockButton} onClick={() => setShow(true)} />
        </>
      );
    };
    const { queryByText, queryByTestId } = render(<Mock />);
    fireEvent.click(queryByTestId(mockButton));
    expect(queryByText(content)).toBeTruthy();
  });

  it('should fire trigger click event', async () => {
    let triggerHasBeenClicked = false;
    const { queryByTestId } = render(
      <DropMenu
        show={false}
        icon={<i />}
        onTriggerClick={() => (triggerHasBeenClicked = true)}
      >
        foo
      </DropMenu>
    );
    fireEvent.click(queryByTestId('drop-menu-trigger'));
    expect(triggerHasBeenClicked).toEqual(true);
  });
});
