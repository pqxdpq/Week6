const { ObjectId } = require("bson");

module.exports = function(db,app,ObjectID){
    app.post('/api/deleteitem',function(req,res){
        if(!req.body){
            return res.sendStatus(400);
        }
        productID = req.body.productid;
        var objectid = new ObjectID(productID);
        const collection = db.collection('products');
        collection.deleteOne({_id:objectid}, (err,docs)=>{
            collection.find({}).sort({"id":1}).toArray((err,data)=>{
                res.send(data);
                console.log(objectid)
            });
        })
    })
}