const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");

require("dotenv").config();
const { verifyToken } = require("./auht.middleware");

const app = express();
const port = 3005;

app.use(express.json());
app.use(cors({ origin: "*" }));

const server = app.listen(port, () => {
  console.log(`API corriendo en el puerto ${port}`);
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.use((socket, next) => {
  verifyToken(socket, next);
});

io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado:", socket.decoded);

  socket.on("temperatura", (data) => {
    console.log(data);
    const { recipient, message, codigo } = data;

    io.to(socket.decoded).emit("temperatura", {
      message: message,
      codigo: codigo,
    });
  });

  socket.on("notification-alert", (data) => {
    console.log(data);
    const { recipient, message, codigo } = data;

    io.to(socket.decoded).emit("notification-alert", {
      message: message,
      codigo: codigo,
    });
  });

  socket.on("notification-desbloqueo", (data) => {
    console.log(data);
    const { recipient, message, codigo } = data;

    io.to(socket.decoded).emit("notification-desbloqueo", {
      message: message,
      codigo: codigo,
    });
  });
});
