module.exports = function(db,app){
    app.post('/api/getauthlist',function(req, res){
        val = req.body;
        console.log(val)
        const collection = db.collection("Auth");
        collection.find({"username":val.username}).toArray((err,data)=>{
            res.send(data);
        })
    })
}