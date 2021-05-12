import { render } from '@testing-library/react';
import WS from 'jest-websocket-mock';
import wsResponse from '../../../../__mocks__/ws-response.json';
import { WebsocketProvider } from '../../../common/context';
import {
  CPU_COUNT_LABEL,
  FREE_MEMORY_LABEL,
  OPERATING_SYSTEM_LABEL,
  PLATFORM_LABEL,
  SYSTEM_UPTIME_LABEL,
  TOTAL_MEMORY_LABEL,
} from './constants';
import { SystemStatistics } from './system-statistics';
import {
  formatFreeMemoryValue,
  formatPlatformValue,
  formatSystemUptimeValue,
  formatTotalMemoryValue,
} from './utils';

let ws: WS;
beforeEach(() => {
  ws = new WS('ws://localhost:3333/ws/metrics');
});
afterEach(() => {
  ws.close();
  WS.clean();
});

describe('SystemStatistics', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(
      <WebsocketProvider>
        <SystemStatistics />
      </WebsocketProvider>
    );
    await ws.connected;
    ws.send(JSON.stringify(wsResponse));
    expect(baseElement).toBeTruthy();
  });

  it('should show formatted platform stat', async () => {
    const { queryByText } = render(
      <WebsocketProvider>
        <SystemStatistics />
      </WebsocketProvider>
    );
    await ws.connected;
    ws.send(JSON.stringify(wsResponse));
    const label = queryByText(PLATFORM_LABEL);
    expect(label.parentElement.firstChild.textContent).toEqual(
      formatPlatformValue(wsResponse.statistics.platform)
    );
  });

  it('should show formatted operating system stat', async () => {
    const { queryByText } = render(
      <WebsocketProvider>
        <SystemStatistics />
      </WebsocketProvider>
    );
    await ws.connected;
    ws.send(JSON.stringify(wsResponse));
    const label = queryByText(OPERATING_SYSTEM_LABEL);
    expect(label.parentElement.firstChild.textContent).toEqual(
      wsResponse.statistics.operatingSystem
    );
  });

  it('should show formatted cpu count stat', async () => {
    const { queryByText } = render(
      <WebsocketProvider>
        <SystemStatistics />
      </WebsocketProvider>
    );
    await ws.connected;
    ws.send(JSON.stringify(wsResponse));
    const label = queryByText(CPU_COUNT_LABEL);
    expect(label.parentElement.firstChild.textContent).toEqual(
      String(wsResponse.statistics.cpuCount)
    );
  });

  it('should show formatted system uptime stat', async () => {
    const { queryByText } = render(
      <WebsocketProvider>
        <SystemStatistics />
      </WebsocketProvider>
    );
    await ws.connected;
    ws.send(JSON.stringify(wsResponse));
    const label = queryByText(SYSTEM_UPTIME_LABEL);
    expect(label.parentElement.firstChild.textContent).toEqual(
      formatSystemUptimeValue(wsResponse.statistics.sysUptime)
    );
  });

  it('should show formatted total memory stat', async () => {
    const { queryByText } = render(
      <WebsocketProvider>
        <SystemStatistics />
      </WebsocketProvider>
    );
    await ws.connected;
    ws.send(JSON.stringify(wsResponse));
    const label = queryByText(TOTAL_MEMORY_LABEL);
    expect(label.parentElement.firstChild.textContent).toEqual(
      formatTotalMemoryValue(wsResponse.statistics.totalMem)
    );
  });

  it('should show formatted free memory stat', async () => {
    const { queryByText } = render(
      <WebsocketProvider>
        <SystemStatistics />
      </WebsocketProvider>
    );
    await ws.connected;
    ws.send(JSON.stringify(wsResponse));
    const label = queryByText(FREE_MEMORY_LABEL);
    expect(label.parentElement.firstChild.textContent).toEqual(
      formatFreeMemoryValue(wsResponse.statistics.freeMem)
    );
  });
});
