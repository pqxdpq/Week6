module.exports = function(db,app){
    app.get('/api/getmessage',function(req, res){
        val = req.body;
        const collection = db.collection("Chat");
        collection.find({"groupname":val.gname, "roomname":rname}).sort({"date":1}).toArray((err,data)=>{
            res.send(data);
            console.log('getmessage');
        })
    })
}