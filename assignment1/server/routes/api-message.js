module.exports = function(db, app){
    app.post('/api/message',function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        msg = req.body;
        const collection = db.collection('Chat');
        collection.insertOne(msg, (err, msg)=>{
            if(err)throw err;
            res.send({'message':msg, err:null});
        })
    });
}