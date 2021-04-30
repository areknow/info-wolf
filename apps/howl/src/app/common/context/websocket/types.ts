import { WsPayload } from '@info-wolf/api-interfaces';

export type WsContextType = {
  data: WsPayload;
  loading: boolean;
};
