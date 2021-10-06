module.exports = function(db, app){
    app.post('/api/addgp',function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        group = req.body;
        const collection = db.collection('Group');
        collection.find({'groupname':group}).count((err,count)=>{
            if(count == 0){
                collection.insertOne(group, (err, dbres)=>{
                    if(err)throw err;
                    let num = dbres.insertedCount;
                    res.send({'num':num, err:null});
                })
            }else{
                res.send({num:0, err:"Name used"});
            }
        });
    });
}