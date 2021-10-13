module.exports = function(db,app){
    app.get('/api/getuser',function(req,res){
        const collection = db.collection('User');
        collection.find({}).toArray((err,data)=>{
            res.send(data)
        })
    });
}