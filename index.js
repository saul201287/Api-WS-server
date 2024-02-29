const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

const port = 3005;

app.use(express.json());

app.use(cors());

const server = app.listen(port, () => {
  console.log(`API corriendo en el puerto ${port}`);
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("message", (message) => {
    console.log("Mensaje recibido del cliente: %s", message);
    socket.broadcast().emit("mensajeServidor", message); 
  });

 
});
