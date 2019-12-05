var scrape = require("../scripts/scrape");
var newDate = require("../scripts/date");

var Title = require("../models/title");

module.exports = {
    fetch: function(callback){
        scrape(function(data){
            var articles = data;
            for(var i=0; i < articles.length;i++){
                articles[i].date = newDate();
                articles[i].saved = false;
            }

            Title.collection.insertMany(articles,{ordered:false},function(err,docs){
                callback(err,docs);
            })
        })
    },
    delete: function(query,callback){
        Title.remove(query,callback);
    },
    get: function(query,callback){
        Title.find(query).sort({_id: -1}).exec(function(err,doc){
            callback(doc);
        })
    },
    update: function(query,callback){
        Titile.update({_id:query._id},{$set:query},{},cb);
    }
}