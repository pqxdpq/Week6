module.exports = function(db,app){
    app.post('/api/removeroom',function(req,res){
        room = req.body;
        const collection = db.collection('Room');
        collection.deleteOne({"id":room.id})
    })
}