module.exports = function(db,app){
    app.post('/api/updateuauth', function(req,res){
        if(!req.body){
            return res.sendStatus(400)
        }
        auth = req.body;
        console.log(auth);
        const collection = db.collection('Auth');
        collection.updateMany({"username":auth.username}, {$set:{"authcode":auth.authcode}},()=>{
            res.send({"success":"success"})
        })
    });
}