module.exports = function(db, app){
    app.post('/api/addu',function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        user = req.body;
        const collection = db.collection('User');
        collection.find({'username':user.name}).count((err,count)=>{
            if(count == 0){
                collection.insertOne(user, (err, dbres)=>{
                    if(err)throw err;
                    let num = dbres.insertedCount;
                    res.send({'num':num, err:null});
                })
                var newauth = {"username":user.name, "authcode":[]};
                db.collection('Auth').insertOne(newauth);
            }else{
                res.send({num:0, err:"Name used"});
            }
        });
    });
}