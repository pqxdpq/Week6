module.exports = function(db,app){
    app.post('/api/updateauth', function(req,res){
        if(!req.body){
            return res.sendStatus(400)
        }
        auth = req.body;
        const collection = db.collection('Auth');
        collection.updateMany({"role":auth.role}, {$push:{"authcode":auth.authcode}},()=>{
            res.send({"success":"success"})
        })
    });
}