module.exports = function(db, app){
    app.post('/api/message',function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        set = req.body;
        isodate = new Date(set.date).toISOString();
        const collection = db.collection('Chat');
        collection.insertOne({"roomid":set.roomid, "sender":set.sender, "message":set.message, "date":isodate}, (err, msg)=>{
            if(err)throw err;
            res.send({'message':msg, err:null});
        })
    });
}