import { render } from '@testing-library/react';
import { InfoGroup } from './info-group';

describe('InfoGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InfoGroup label="foo" content="bar" />);
    expect(baseElement).toBeTruthy();
  });

  it('should show label', () => {
    const label = 'foo';
    const { queryByText } = render(<InfoGroup label={label} content="bar" />);
    expect(queryByText(label)).toBeTruthy();
  });

  it('should show content', () => {
    const content = 'bar';
    const { queryByText } = render(<InfoGroup label="foo" content={content} />);
    expect(queryByText(content)).toBeTruthy();
  });

  it('should not show an icon', () => {
    const { baseElement } = render(<InfoGroup label="foo" content="bar" />);
    expect(baseElement.querySelectorAll('i').length).toEqual(0);
  });

  it('should show icon', () => {
    const icon = <i data-testid="mock-icon" />;
    const { queryByTestId } = render(
      <InfoGroup label="foo" content="bar" icon={icon} />
    );
    expect(queryByTestId('mock-icon')).toBeTruthy();
  });
});
