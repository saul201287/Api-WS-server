const express = require("express");
const { Server } = require("socket.io");

const cors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  next();
}

const app = express();

const port = 3005;

app.use(express.json());

app.use(cors);

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
    socket.emit("mensajeServidor", message); 
  });

 
});
