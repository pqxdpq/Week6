module.exports = function(db, app){
    app.post('/api/addroom',function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        room = req.body;
        const collection = db.collection('Room');
        collection.find({'roomname':room.roomname, 'parentgroup':room.parentgroup}).count((err,count)=>{
            if(count == 0){
                collection.insertOne({'parentgroup':room.parentgroup, "roomname":room.roomname, "id":room.id}, (err, dbres)=>{
                    if(err)throw err;
                    res.send({err:null});
                })
            }else{
                res.send({num:0, err:"Name used"});
            }
        });
    });
}