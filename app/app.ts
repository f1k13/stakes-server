import { server, PORT } from "./httpServer";
import { wss } from "./webSocketServer";

const start = async () => {
  try {
    server.listen(PORT, () => {
      console.log(`HTTP server start on port ${PORT}`);
    });

    wss.on("listening", () => {
      console.log("WebSocket server started");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
