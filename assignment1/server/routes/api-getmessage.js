module.exports = function(db,app){
    app.post('/api/getmessage',function(req, res){
        val = req.body;
        const collection = db.collection("Chat");
        collection.find({"roomid":val.roomid}).sort({"date":1}).toArray((err,data)=>{
            res.send(data);
        })
    })
}