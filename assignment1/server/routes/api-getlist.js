module.exports = function(db,app){
    app.post('/api/getlist',function(req, res){
        val = req.body;
        const collection = db.collection(val.val);
        collection.find({}).toArray((err,data)=>{
            res.send(data);
        })
    })
}