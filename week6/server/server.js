const express = require('express')
const app = express();
const cors = require('cors');
const http =  require('http').Server(app);
const io = require('socket.io') (http, {
    cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"],
      allowedHeaders: [""],
      credentials: true,
      transports: ['websocket', 'polling']
    },
    allowEIO3: true
  });
const sockets = require('./socket.js');
const server = require('./listen.js');

//Define port used for the server
const PORT = 3000;

// Apply express middleware
app.use(cors());

//setup Socket
sockets.connect(io, PORT)

//Start server listening for requests.
server.listen(http,PORT);