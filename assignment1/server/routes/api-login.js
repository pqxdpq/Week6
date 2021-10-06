module.exports = function(db,app){
    app.post('/api/login',function(req, res){
        const collection = db.collection('User');
        login = req.body;
        collection.find({'username':login.username, "password":login.password}).count((err,count)=>{
            if(count == 1){
                collection.find({'username':login.username, "password":login.password}).toArray((err,data)=>{
                    res.send({data});
                });
               
            }else{
                res.send({num:0, err:"Data incorrect!"});
            }
        });
    })
}