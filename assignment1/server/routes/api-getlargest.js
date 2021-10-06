module.exports = function(db,app){
    app.get('/api/getlargest',function(req,res){
        if(!req.body){
            return res.sendStatus(400)
        }
        const collection = db.collection('Auth');
        collection.aggregate([{$limit:1},{"$project":{"name":1, "max":{"$max":"$authcode"}}}],(err,num)=>{
            res.send({'max':num});
        });
    });
}