module.exports = function(db,app){
    app.post('/api/getrooms',function(req, res){
        val = req.body;
        const collection = db.collection("Room");
        collection.find({"parentgroup":val.groupname}).toArray((err,data)=>{
            res.send(data);
        })
    })
}