module.exports = function(db,app){
    app.post('/api/getgroups',function(req, res){
        val = req.body;
        const collection = db.collection("Group");
        collection.find({"id":val.id}).sort({"id":1}).toArray((err,data)=>{
            res.send(data);
        })
    })
}