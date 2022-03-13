var mongoose = require("mongoose");

var hospitalDataSchema = new mongoose.Schema({
    allRoomData:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "singleRoom"
    }],
    allPersonalData:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "singlePersonnel"
    }],
    allInventoryData:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "singleInventory"
    }],
    LocationData:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "locationData"
    }],
    distanceOfHospital:String,
    nameOfHospital:String,
    imgURL:String,
})

module.exports = mongoose.model("hospitalData",hospitalDataSchema);