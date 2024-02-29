import express from "express";
import { Server } from "socket.io";

const app = express();
const port = 3005;

app.use(express.json());

const server = app.listen(port, () => {
  console.log(`api corriendo en el purto ${port}`);
});

const ServerWS = new Server(server);

ServerWS.on("connection", (ws) => {
  console.log("Cliente conectado");

  ws.on("message", (message) => {
    console.log("Mensaje recibido del cliente: %s", message);
    ws.emit("Mensaje recibido por el servidor: " + message);
  });

  ws.on("close", () => {
    console.log("Cliente desconectado");
  });
});
