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
//Define port used for the server
const PORT = 3000;

// Apply express middleware
app.use(cors());
MongoClient.connect(url, {maxPoolSize:10, useNewUrlParser: true, useUnifiedTopology: true},function(err,client){
  if (err){ return console.log(err)}
      const dbName = 'chat';
      const db = client.db(dbName);

      require('./routes/api-addgroup')(db,app);
      require('./routes/api-addroom')(db,app);
      require('./routes/api-adduser')(db,app);
      require('./routes/api-getlist')(db,app);
      require('./routes/api-getmessage')(db,app);
      require('./routes/api-login')(db,app);
      require('./routes/api-removegroup')(db,app);
      require('./routes/api-removeroom')(db,app);
      require('./routes/api-removeuser')(db,app);
      require('./routes/api-message')(db,app);
      //require('./routes/api-updateuser')(db,app);

});
//setup Socket
sockets.connect(io, PORT)

//Start server listening for requests.

app.listen (PORT,( )=>{
      let d = new Date();
      let h  = d.getHours();
      let m = d.getMinutes();
      console.log('Server has been started on port' + PORT + ' at ' + h + '.' +m);
});