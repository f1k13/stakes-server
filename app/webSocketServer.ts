import { WebSocketServer } from "ws";
import { server } from "./httpServer";

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client wss connect");

  ws.on("message", (message) => {
    console.log(`Message: ${message}`);
  });

  ws.on("close", () => {
    console.log("Client disconnect");
  });
});

export { wss };
