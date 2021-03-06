import { WsPayload } from '@info-wolf/api-interfaces';
import { createContext, useContext, useEffect, useState } from 'react';
import { environment } from '../../../../environments/environment';
import { DEFAULT_STATE } from './constants';
import { WsContextType } from './types';

export const WsContext = createContext<WsContextType>({
  data: DEFAULT_STATE,
  loading: true,
  error: false,
});

/**
 * This provider allows all descendants to get access to the websocket
 * data payload served from the API. There is no setter functionality
 * as the payload is immutable readonly one way data. The application
 * shows a loading state until the first web socket message is received.
 * @returns Children of the provider
 */
export const WebsocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [wsContext, setWsContext] = useState<WsPayload>(DEFAULT_STATE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Open a websocket using the environmental variable
    const ws = new WebSocket(environment.webSocketUrl);
    ws.onmessage = (event) => {
      // Parse response and store in context state
      const response = JSON.parse(event.data);
      setWsContext(response);
      // Remove loading state
      if (loading) {
        setLoading(false);
      }
    };
    // Show error message if socket error event occurs
    ws.onerror = () => {
      setError(true);
    };
    ws.onclose = () => {
      ws.close();
    };
    // Clean up the socket when component unmounted
    return () => {
      ws.close();
    };
  }, [loading]);

  return (
    <WsContext.Provider value={{ data: wsContext, loading, error }}>
      {children}
    </WsContext.Provider>
  );
};

/**
 * Helper hook that returns the websocket context.
 * This also prevents the need to call useContext elsewhere in the application.
 */
export const useWsContext = () => useContext(WsContext);
