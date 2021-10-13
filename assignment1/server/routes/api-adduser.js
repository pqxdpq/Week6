module.exports = function(db, app){
    app.post('/api/adduser',function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        user = req.body;
        const collection = db.collection('User');
        collection.find({'username':user.name}).count((err,count)=>{
            if(count == 0){
                collection.insertOne({"username":user.username,"email":user.email,"password":user.password,"role":user.role}, (err, dbres)=>{
                    if(err)throw err;
                    let num = dbres.insertedCount;
                    res.send({'num':num, err:null});
                })
                var newauth = {"username":user.username, "authcode":[]};
                db.collection('Auth').insertOne(newauth);
            }else{
                res.send({num:0, err:"Name used"});
            }
        });
    });
}