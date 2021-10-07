module.exports = function(db,app){
    app.get('/api/getlargest',function(req,res){
        const collection = db.collection('Auth');
        collection.aggregate([{$limit:1},{"$project":{"name":1, "max":{"$max":"$authcode"}}}]).toArray((err,data)=>{
            res.send(data)
        })
    });
}