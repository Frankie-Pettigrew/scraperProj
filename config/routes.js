

var scrape = require("../scripts/scrape");

var titleController = require("../controller/titles");
var commentController = require("../controller/comments");


module.exports = function(router){
    router.get("/",function(req,res){
        console.log("rendering");
        res.render("home");
    });

    router.get("/saved",function(req,res){
        res.render("saved");
    })

    router.get("/api/fetch",function(req,res){
        titleController.fetch(function(err,docs){
            if(!docs || docs.insertedCount === 0){
                res.json({message: "no new articles"});
            } else {
                res.json({
                    message: "Added " + docs.insertedCount + " new articles"
                });
            }
        });
    });

    router.get("/api/titles",function(req,res){
        var query = {};
        if(req.query.saved){
            query = req.query;
        }
        titleController.get(query,function(data){
            res.json(data);
        });
    });

    router.delete("/api/titles/:id", function(req,res){
        var query = {};
        query._id = req.params.id;
        titleController.delete(query,function(err,data){
            res.json(data);
        })
    });

    router.patch("/api/titles",function(req,res){
        titleController.update(req.body, function(err, data){
            res.json(data);
        });
    });

    router.get("/api/notes/:title_id?",function(req,res){
        var query = {};
        if(req.params.title_id){
            query._id = req.params.title_id;
        }

        commentController.get(query, function(err,data){
            res.json(data);
        })
    })

    router.delete("/api/notes/:id",function(err,data){
        var query = {};
        query._id = req.params.id;
        commentController.delete(query, function(err,data){
            res.json(data);
        });
    });

    router.post("/api/notes",function(req,res){
        commentController.save(req.body,function(data){
            res.json(data);
        });
    });
}