module.exports = function(db,app){
    app.get('/api/getlist',function(req, res){
        const collection = db.collection('products');
        collection.find({}).sort({"id":1}).toArray((err,data)=>{
            res.send(data);
            console.log('getlist');
        })
    })
}