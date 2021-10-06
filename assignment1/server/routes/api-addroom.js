module.exports = function(db, app){
    app.post('/api/addrm',function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        room = req.body;
        const collection = db.collection('Room');
        collection.find({'roomname':room.name, 'parentgroup':room.pname}).count((err,count)=>{
            if(count == 0){
                collection.insertOne(room, (err, dbres)=>{
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