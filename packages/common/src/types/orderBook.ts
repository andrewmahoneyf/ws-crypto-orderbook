export interface Context {
  readyState: string;
  ws?: WebSocket;
  error: string | null;
}
