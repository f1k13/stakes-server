import express from "express";
import router from "../routes";
import http from "http";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", router);

const server = http.createServer(app);

export { app, server, PORT };
