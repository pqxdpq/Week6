const { ObjectId } = require("bson");

module.exports = function(db,app){
    app.post('/api/removeuser',function(req,res){
        if(!req.body){
            return res.sendStatus(400);
        }
        user = req.body;
        console.log(user)
        const ucollection = db.collection('User');
        const acollection = db.collection('Auth');
        ucollection.deleteOne({"username":user.username});
        acollection.deleteOne({"username":user.username});
        res.send({"success":"success"})
    })
}