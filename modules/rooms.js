var mongoose = require("mongoose");

var roomsSchema = new mongoose.Schema({
    allRoomData:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "singleRoom"
    }]
})

module.exports = mongoose.model("roomData",roomsSchema);