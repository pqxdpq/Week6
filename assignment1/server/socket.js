module.exports = {
    connect: function(io, PORT) {
        userset = [];
        global.room="";
        io.on('connection', (socket) => {
        socket.on('leave',function(room){
            socket.leaveAll()
        })
        socket.on('passdata', function (data) {
            room = data;
            socket.join(room);
            console.log('room',room)
            //io.emit(room);
            if(!socket.id in userset){
                userset.push({
                    key: socket.id,
                    value: room
                });
            }else{
              userset[socket.id] = room  
            }
            });
        socket.on('message', function(message){
            console.log(userset)
            io.to(userset[socket.id]).emit(message)
            console.log(io.sockets.adapter.rooms)
            console.log(socket.id + ' say ' + message + ' in ' + userset[socket.id]);
        })
        // When a connection request comes in output to the server console
        console.log('user connection on port '+ PORT + ' : '+ socket.id);
        // when a message comes in emit it back to all sockets with the message.
        });
    }
}