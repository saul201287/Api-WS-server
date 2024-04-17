const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");

require("dotenv").config();
const { verifyToken } = require("./auht.middleware");

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
io.use((socket, next) => {
  verifyToken(socket, next);
});
io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado:", socket.decoded);
  const userChannel = `usuario${socket.decoded}`;
  socket.join(userChannel);
  console.log(userChannel);
  socket.on("message", (data) => {
    const { recipient, message } = data;
    const recipientChannel = `user_${recipient}`;
    if (io.sockets.adapter.rooms.has(recipientChannel)) {
      io.to(recipientChannel).emit("message", {
        from: socket.decoded.username,
        message: message,
      });
    } else {
      console.log(`El usuario ${recipient} no está conectado actualmente.`);
    }
  });
});
