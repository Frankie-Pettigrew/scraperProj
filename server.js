var express = require("express");
var hndl = require("express-handlebars");
var mongoose = require("mongoose");

var router = express.Router();

require("./config/routes.js")(router);


var PORT = process.env.PORT || 8080;

// Initialize Express
var app = express();

// Configure middleware
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));
app.engine("handlebars", hndl({defaultLayout: "layout"}));
app.set("view engine", "handlebars");


app.use(router);


var db = process.env.MONGODB_URI || "mongodb://localhost/scraperProj";

// Connect to the Mongo DB
mongoose.connect(db, {useNewUrlParser: true});



// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});