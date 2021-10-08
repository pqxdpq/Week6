module.exports = function(db,app){
    app.post('/api/removegroup',function(req,res){
        if(!req.body){
            return res.sendStatus(400);
        }
        Group = req.body
        const collection = db.collection('Group');
        collection.deleteOne({"groupname":Group.groupname}, (err,docs)=>{
            db.collection("Auth").updateMany({},{$pull:{"authcode":Group.id}})
            db.collection("Room").find({"parentgroup":Group.groupname},{"id":1,_id:0}).toArray((err2,data2)=>{
                for(let x in data2){
                    db.collection("Auth").updateMany({},{$pull:{"authcode":data2[x].id}})
                }
            })
            db.collection('Room').remove({"parentgroup":Group.groupname});
        })
    })
}