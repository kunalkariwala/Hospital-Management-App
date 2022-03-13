var mongoose = require("mongoose");

var locationSchema = new mongoose.Schema({
    address:String
})

module.exports = mongoose.model("locationData",locationSchema);