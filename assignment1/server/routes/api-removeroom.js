const { ObjectId } = require("bson");

module.exports = function(db,app,ObjectID){
    app.post('/api/deleteroom',function(req,res){
        if(!req.body){
            return res.sendStatus(400);
        }
        room = req.body;
        const collection = db.collection('Room');
        collection.deleteOne({"parentgroup":room.pname,"roomname":room.name})
    })
}