module.exports = function(db,app){
    app.post('/api/getauth',function(req, res){
        val = req.body;
        const collection = db.collection("Auth");
        collection.find({"username":val.username}).toArray((err,data)=>{
            res.send(data);
        })
    })
}