import { render } from '@testing-library/react';
import { About } from './about';
import { HEADING } from './contants';

describe('About', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(<About />);
    expect(baseElement).toBeTruthy();
  });

  it('should show heading', async () => {
    const { queryByText } = render(<About />);
    expect(queryByText(HEADING)).toBeTruthy();
  });
});
