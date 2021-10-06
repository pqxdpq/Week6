const { ObjectId } = require("bson");

module.exports = function(db,app,ObjectID){
    app.post('/api/deletegroup',function(req,res){
        if(!req.body){
            return res.sendStatus(400);
        }
        Groupname = req.body.gpname;
        const collection = db.collection('Group');
        collection.deleteOne({"groupname":Groupname}, (err,docs)=>{
            db.collection('Room').remove({"parentgroup":Groupname});
        })
    })
}