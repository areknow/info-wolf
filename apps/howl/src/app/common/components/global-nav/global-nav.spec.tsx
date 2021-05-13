import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { GlobalNav } from './global-nav';

describe('GlobalNav', () => {
  it('should render successfully', () => {
    const history = createMemoryHistory();
    const { baseElement } = render(
      <Router history={history}>
        <GlobalNav />
      </Router>
    );
    expect(baseElement).toBeTruthy();
  });
});
