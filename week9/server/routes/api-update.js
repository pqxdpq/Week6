
module.exports = function(db,app,ObjectID){
    var result;
    app.post('/api/update', function(req,res){
        if(!req.body){
            return res.sendStatus(400)
        }
        product = req.body;
        var objectid = new ObjectID(product.objectid)
        console.log(product);
        const collection = db.collection('products');
        collection.updateOne({_id:objectid}, {$set:{name:product.name,description:product.description, price:product.price,units:product.units}},()=>{
            res.send({'ok':objectid});
            console.log("update",objectid);
        })
    });
}