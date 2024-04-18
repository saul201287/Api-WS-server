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
//io.use((socket, next) => {
// verifyToken(socket, next);
//});
io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado:", socket.decoded);
  const userChannel = `usuario${socket.decoded}`;
  //socket.join(userChannel);
  //console.log(userChannel);
  socket.on("temperatura", (data) => {
    console.log(data);
    const { recipient, message } = data;
    const recipientChannel = `user_${recipient}`;

    io.emit("temperatura", {
      message: message,
    });
    
  });
  socket.on("notification-alert", (data) => {
    console.log(data);
    const { recipient, message } = data;
    const recipientChannel = `user_${recipient}`;

    io.emit("notification-alert", {
      message: message,
    });
    
  });
  socket.on("notification-desbloque", (data) => {
    console.log(data);
    const { recipient, message } = data;
    const recipientChannel = `user_${recipient}`;

    io.emit("notification-desbloquea", {
      message: message,
    });
    
  });
});
