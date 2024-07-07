import { WebSocketServer } from "ws";

class OddsServiceWebSocket {
  constructor(wss: WebSocketServer) {
    this.wss = wss;
  }
}
