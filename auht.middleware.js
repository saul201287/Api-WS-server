const jwt = require("jsonwebtoken");

function verifyToken(socket, next) {
  const token = socket.handshake.auth.token;
  if (!token) {
    console.log(token,2);
    return next(new Error("Token de autenticación no proporcionado"));
  }
  try {
    const data2 = jwt.verify(token, process.env.SECRET_TOKEN)
    socket.decoded = data2;
    next();
  console.log(data2);
  } catch (error) {
    console.log(error);
    return next(new Error("Token de autenticación inválido"));
  }
  
}

module.exports = { verifyToken };
