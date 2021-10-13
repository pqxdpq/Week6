module.exports = function(db, app){
    app.post('/api/updateuser',function(req, res){
        if(!req.body){
            return res.sendStatus(400)
        }
        user = req.body;
        const collection = db.collection('User');
        collection.findOneAndUpdate({"username":user.username},{$set:{"email":user.email, "password":user.password, "role":user.role}})
    });
}