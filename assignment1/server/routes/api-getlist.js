module.exports = function(db,app){
    app.get('/api/getlist',function(req, res){
        val = req.body;
        const collection = db.collection(val);
        collection.find({}).sort({"id":1}).toArray((err,data)=>{
            res.send(data);
            console.log('getlist');
        })
    })
}