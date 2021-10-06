module.exports = function(db,app,ObjectID){
    app.post('/api/getitem',function(req, res){
        productID = req.body.productid;
        console.log('check',req)
        var objectid = new ObjectID(productID);
        const collection = db.collection('products');
        collection.find({_id:objectid}).toArray((err,data)=>{
            res.send(data);
            console.log(objectid);
        })
    })
}