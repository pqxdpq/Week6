const express = require('express')
const app = express();
const cors = require('cors');
const http =  require('http').Server(app);
const bodyParser = require('body-parser');
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
const url = 'mongodb://localhost:27017';

//Define port used for the server
const PORT = 3000;

// Apply express middleware
app.use(cors());
app.use(bodyParser.json());
//setup Socket
sockets.connect(io, PORT)
MongoClient.connect(url, {maxPoolSize:10, useNewUrlParser: true, useUnifiedTopology: true},function(err,client){
  if (err){ return console.log(err)}
      const dbName = 'chat';
      const db = client.db(dbName);

      require('./routes/api-addgroup')(db,app);
      require('./routes/api-addroom')(db,app);
      require('./routes/api-adduser')(db,app);
      require('./routes/api-getauth')(db,app);
      require('./routes/api-getgroups')(db,app);
      require('./routes/api-getrooms')(db,app);
      require('./routes/api-getmessage')(db,app);
      require('./routes/api-login')(db,app);
      require('./routes/api-removegroup')(db,app);
      require('./routes/api-removeroom')(db,app);
      require('./routes/api-removeuser')(db,app);
      require('./routes/api-message')(db,app);
      //require('./routes/api-updateuser')(db,app);

});
//Start server listening for requests.
server.listen(http,PORT);