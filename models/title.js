var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var titleSchema = new Schema({title: {
    type: String,
    required: true,
    unique: true
},
summary : {
    type: String,
    required: true
},
date: String,
saved : {
    type: Boolean,
    default: false
}
});

var Title = mongoose.model("Title",titleSchema);
module.exports = Title;