module.exports = function(db,app){
    app.post('/api/getgrouplist',function(req, res){
        val = req.body;
        console.log(val)
        const collection = db.collection("Group");
        collection.find({"id":val.id}).toArray((err,data)=>{
            res.send(data);
        })
    })
}