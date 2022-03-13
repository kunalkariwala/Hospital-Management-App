var mongoose = require("mongoose");

var allPersonnelSchema = new mongoose.Schema({
    allPersonnelData:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "singlePersonnel"
    }]
})

module.exports = mongoose.model("personnelData",allPersonnelSchema);