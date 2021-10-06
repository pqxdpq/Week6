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
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017';
MongoClient.connect(url, {maxPoolSize:10, useNewUrlParser: true, useUnifiedTopology: true},function(err,client){
  if (err){ return console.log(err)}
      const dbName = 'chat';
      const db = client.db(dbName);

      require('./routes/api-add')(db,app);
      require('./routes/api-prodcount')(db,app);
      require('./routes/api-validid')(db,app);
      require('./routes/api-getlist')(db,app);
      require('./routes/api-getitem')(db,app, ObjectID);
      require('./routes/api-update')(db,app, ObjectID);
      require('./routes/api-deleteitem')(db,app, ObjectID);

  require('./listen.js')(http,PORT);
});
//Define port used for the server
const PORT = 3000;

// Apply express middleware
app.use(cors());

//setup Socket
sockets.connect(io, PORT)

//Start server listening for requests.
server.listen(http,PORT);