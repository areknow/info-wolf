import { render } from '@testing-library/react';
import Highcharts from 'highcharts';
import WS from 'jest-websocket-mock';
import { act } from 'react-dom/test-utils';
import wsResponseHighCpu from '../../../../__mocks__/ws-response-high-cpu.json';
import wsResponse from '../../../../__mocks__/ws-response.json';
import { WebsocketProvider } from '../../../common/context';
import { UsageSummary } from './usage-summary';

let ws: WS;
beforeEach(() => {
  ws = new WS('ws://localhost:3333/ws/metrics');
});
afterEach(() => {
  ws.close();
  WS.clean();
});

describe('UsageSummary', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(
      <WebsocketProvider>
        <UsageSummary />
      </WebsocketProvider>
    );
    await ws.connected;
    ws.send(JSON.stringify(wsResponse));
    expect(baseElement).toBeTruthy();
  });

  it('should not show zoom button', async () => {
    const { queryByTestId } = render(
      <WebsocketProvider>
        <UsageSummary />
      </WebsocketProvider>
    );
    await ws.connected;
    ws.send(JSON.stringify(wsResponse));
    expect(queryByTestId('usage-summary-zoom-trigger')).not.toBeTruthy();
  });

  it('should show zoom button after highcharts selection event', async () => {
    const { queryByTestId } = render(
      <WebsocketProvider>
        <UsageSummary />
      </WebsocketProvider>
    );
    await ws.connected;
    ws.send(JSON.stringify(wsResponse));
    act(() => {
      Highcharts.fireEvent(
        Highcharts.charts.find((chart) => chart),
        'selection',
        {
          xAxis: [
            {
              min: 1,
              max: 2,
            },
          ],
        }
      );
    });
    expect(queryByTestId('usage-summary-zoom-trigger')).toBeTruthy();
  });

  it('should not show warnings drop menu icon', async () => {
    const { queryByTestId } = render(
      <WebsocketProvider>
        <UsageSummary />
      </WebsocketProvider>
    );
    await ws.connected;
    ws.send(JSON.stringify(wsResponse));
    expect(queryByTestId('usage-summary-warnings-icon')).not.toBeTruthy();
  });

  it('should show warnings drop menu icon when alerts are detected', async () => {
    const { queryByTestId } = render(
      <WebsocketProvider>
        <UsageSummary />
      </WebsocketProvider>
    );
    await ws.connected;
    ws.send(JSON.stringify(wsResponseHighCpu));
    expect(queryByTestId('usage-summary-warnings-icon')).toBeTruthy();
  });
});
