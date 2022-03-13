var mongoose = require("mongoose");

var inventorySchema = new mongoose.Schema({
    number:String,
    allInventoryData:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "singleInventory"
    }]
})

module.exports = mongoose.model("inventoryData",inventorySchema);