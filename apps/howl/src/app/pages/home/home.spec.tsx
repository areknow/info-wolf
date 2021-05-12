import { render } from '@testing-library/react';
import WS from 'jest-websocket-mock';
import wsResponse from '../../../__mocks__/ws-response.json';
import { WebsocketProvider } from '../../common/context';
import { Home } from './home';

let ws: WS;
beforeEach(() => {
  ws = new WS('ws://localhost:3333/ws/metrics');
});
afterEach(() => {
  ws.close();
  WS.clean();
});

describe('Home', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(
      <WebsocketProvider>
        <Home />
      </WebsocketProvider>
    );

    await ws.connected;
    ws.send(JSON.stringify(wsResponse));

    expect(baseElement).toBeTruthy();
  });

  it('should show all cards', async () => {
    const { queryByText } = render(
      <WebsocketProvider>
        <Home />
      </WebsocketProvider>
    );

    await ws.connected;
    ws.send(JSON.stringify(wsResponse));

    expect(queryByText('Usage over time')).toBeTruthy();
    expect(queryByText('Load')).toBeTruthy();
    expect(queryByText('Statistics')).toBeTruthy();
    expect(queryByText('CPU time')).toBeTruthy();
    expect(queryByText('Memory')).toBeTruthy();
  });
});
