var mongoose = require("mongoose");

var singleInventorySchema = new mongoose.Schema({
    inventoryCode:String,
    inventoryNumber:String,
    inventoryName:String
})

module.exports = mongoose.model("singleInventory",singleInventorySchema);