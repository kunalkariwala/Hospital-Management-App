var mongoose = require("mongoose");

var singlePersonnelSchema = new mongoose.Schema({
    qualification:String,
    name:String
})

module.exports = mongoose.model("singlePersonnel",singlePersonnelSchema);