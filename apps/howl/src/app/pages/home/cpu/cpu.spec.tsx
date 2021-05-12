import { render } from '@testing-library/react';
import WS from 'jest-websocket-mock';
import wsResponse from '../../../../__mocks__/ws-response.json';
import { WebsocketProvider } from '../../../common/context';
import { Cpu } from './cpu';

let ws: WS;
beforeEach(() => {
  ws = new WS('ws://localhost:3333/ws/metrics');
});
afterEach(() => {
  ws.close();
  WS.clean();
});

describe('Cpu', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(
      <WebsocketProvider>
        <Cpu />
      </WebsocketProvider>
    );
    await ws.connected;
    ws.send(JSON.stringify(wsResponse));
    expect(baseElement).toBeTruthy();
  });
});
