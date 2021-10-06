const { ObjectId } = require("bson");

module.exports = function(db,app){
    app.post('/api/deleteroom',function(req,res){
        if(!req.body){
            return res.sendStatus(400);
        }
        user = req.body;
        const ucollection = db.collection('User');
        const acollection = db.collection('Auth');
        ucollection.deleteOne({"username":user.name});
        acollection.deleteOne({"username":user.name});
    })
}