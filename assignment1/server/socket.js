module.exports = {
    connect: function(io, PORT) {
        global.room="";
        io.on('connection', (socket) => {
        socket.on('passdata', function (data) {
            console.log(socket.id,data);
            socket.leave(room);
            room = data;
            socket.join(room);
            //io.emit(room);
            console.log(socket.rooms);
            });
        socket.on('message', function(message){
            io.emit(room,message)
            console.log(socket.id + ' say ' + message + ' in ' + room);
        })
        // When a connection request comes in output to the server console
        console.log('user connection on port '+ PORT + ' : '+ socket.id);
        // when a message comes in emit it back to all sockets with the message.
        });
    }
}