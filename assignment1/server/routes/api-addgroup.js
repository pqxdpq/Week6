module.exports = function(db, app){
    app.post('/api/addgroup',function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        group = req.body;
        console.log(group);
        const collection = db.collection('Group');
        collection.find({'groupname':group}).count((err,count)=>{
            if(count == 0){
                collection.insertOne({"groupname":group.groupname, "id":group.id}, (err, dbres)=>{
                    if(err)throw err;
                    res.send({'dbres':dbres, err:null});
                })
            }else{
                res.send({num:0, err:"Name used"});
            }
        });
    });
}