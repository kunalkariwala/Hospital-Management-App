var mongoose = require("mongoose");

var roomSchema = new mongoose.Schema({
    roomCode:String,
    roomNumber:String
})

module.exports = mongoose.model("singleRoom",roomSchema);