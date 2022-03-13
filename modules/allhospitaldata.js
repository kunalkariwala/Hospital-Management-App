var mongoose = require("mongoose");

var hospitalDataArraySchema = new mongoose.Schema({
    allHospitalData:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "hospitalData"
    }],
    key:{
        type:String,
        default:"findme2"
    }
})

module.exports = mongoose.model("allHospitalData",hospitalDataArraySchema);