import { WsPayload } from '@info-wolf/api-interfaces';
import { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_STATE } from './constants';
import { WsContextType } from './types';

export const WsContext = createContext<WsContextType>({
  data: DEFAULT_STATE,
});

export const WebsocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [wsContext, setWsContext] = useState<WsPayload>(DEFAULT_STATE);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3333/ws/metrics');
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      setWsContext(response);
    };
    ws.onclose = () => {
      ws.close();
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <WsContext.Provider value={{ data: wsContext }}>
      {children}
    </WsContext.Provider>
  );
};

export const useWsContext = () => useContext(WsContext);
