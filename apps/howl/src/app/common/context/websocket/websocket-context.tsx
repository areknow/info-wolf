import { WsPayload } from '@info-wolf/api-interfaces';
import { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_STATE } from './constants';
import { WsContextType } from './types';

export const WsContext = createContext<WsContextType>({
  data: DEFAULT_STATE,
  loading: true,
});

export const WebsocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [wsContext, setWsContext] = useState<WsPayload>(DEFAULT_STATE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // discuss endpoint url...
    const ws = new WebSocket('ws://localhost:3333/ws/metrics');
    ws.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);
        setWsContext(response);
      } catch (error) {
        // action this...
        console.log('error');
      } finally {
        if (loading) {
          setLoading(false);
        }
      }
    };
    ws.onclose = () => {
      ws.close();
    };
    return () => {
      ws.close();
    };
  }, [loading]);

  return (
    <WsContext.Provider value={{ data: wsContext, loading }}>
      {children}
    </WsContext.Provider>
  );
};

export const useWsContext = () => useContext(WsContext);
