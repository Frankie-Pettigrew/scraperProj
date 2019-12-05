var Comment = require("../models/comments");
var newDate = require("../scripts/date");

module.exports = {
    get: function(data,callback){
        Comment.find({
            _titleId: data._id
        },callback);
    },
    save: function(data,callback){
        var newComment = {
            _titleId: data._id,
            date: newDate(),
            commentText: data.commentText
        };

        Comment.create(newComment,function(err,doc){
            if(err){
                console.log(err);
            } else {
                console.log(doc);
                callback(doc);
            }
        })
    },
    delete: function(data,callback){
        Comment.remove({_id: data._id},callback)
    }
}