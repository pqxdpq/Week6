module.exports = {
    connect: function(io, PORT) {
        userset = [];
        global.room="";
        io.on('connection', (socket) => {
        socket.on('leave',function(room){
            socket.leave(room)
            const listener = (...arg) =>{
                console.log(arg);
            }
            socket.off(room, listener);
        })
        //passdata is function to change room. leave will be called first before calling passdata
        socket.on('passdata', function (data) {
            console.log(socket.id,data);
            room = data;
            socket.join(room);
            //userset is to check the current room that socket is in. will change when leave and join room
            if(!socket.id in userset){
                userset.push({
                    key: socket.id,
                    value: room
                });
            }else{
              userset[socket.id] = room  
            }
            console.log(socket.rooms);
            });
        socket.on('message', function(message){
            io.emit(userset[socket.id],message)
            console.log(socket.rooms)
            console.log(socket.id + ' say ' + message + ' in ' + userset[socket.id]);
            
        })
        // When a connection request comes in output to the server console
        console.log('user connection on port '+ PORT + ' : '+ socket.id);
        // when a message comes in emit it back to all sockets with the message.
        });
    }
}