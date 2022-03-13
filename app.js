const express = require('express'),
      app     = express(),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      methodOverride = require("method-override"),
      flash = require("connect-flash");
var port = process.env.PORT || 3000;
var AllHospitalData = require("./modules/allhospitaldata");
var HospitalData = require("./modules/hospitalData");
var Rooms = require("./modules/rooms");
var SingleRoom = require("./modules/singleroom");
var Location = require("./modules/location");
var Inventory = require("./modules/inventories");
var SingleInventory = require("./modules/singleInventory");
var Personnel = require("./modules/allPersonnelData");
var SinglePersonnel = require("./modules/singlepersonnel");
const singleInventory = require('./modules/singleInventory');

mongoose.connect("mongodb+srv://kunal-kariwala:kunal@123@cluster0.wqrou.mongodb.net/<Lifeline>?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true
}).then(() => {
    console.log("connected to DB!")
}).catch(err => {
    console.log("error message:" + err.message);
})

app.use(methodOverride("_method"));
app.use(express.static("public"));

app.use('/web', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.render("home.ejs");
})
app.get("/allHospitals",function(req,res){
    HospitalData.find({}).populate("hospitalData").exec(function(err,foundHospitals){
        if(err){
            console.log(err);
            res.redirect("/");
        }
        else{
            console.log(foundHospitals);
            res.render("allhospitals.ejs",{hospitals:foundHospitals});
        }
    })
})
app.get("/newHospital",function(req,res){
    res.render("newhospital.ejs");
})

app.post("/newHospital",function(req,res){
    Location.create({
        address:req.body.address
    },function(err,createdLocationObject){
        if(err){
            console.log(err);
            res.redirect("/newHospital");
        }
        else{
            console.log(createdLocationObject);
            HospitalData.create({
                distanceOfHospital:req.body.distance,
                imgURL:req.body.image,
                nameOfHospital:req.body.name,
                },function(err,createdHospital){
                if(err){
                    console.log(err);
                    res.redirect("/newHospital");
                }
                else{
                    
                    createdHospital.LocationData.push(createdLocationObject);
                    createdHospital.save();
                    console.log(createdHospital);
                    res.redirect("/hospital/" + createdHospital._id);
                }
            })
        }
    })
})

app.get("/hospital/:id",function(req,res){
    HospitalData.findById(req.params.id).populate("LocationData").exec(function(err,foundHospital){
        if(err){
            console.log(err);
            res.redirect("/");
        }
        else{
            console.log(foundHospital);
            res.render("specifichospital.ejs",{hospital:foundHospital});
        }
    })
})

app.get("/:id/addinventory",function(req,res){
    HospitalData.findById(req.params.id).populate("allInventoryData").exec(function(err,foundHospital){
        res.render("newinventory.ejs",{hospital:foundHospital});
    })
})

app.post("/newinventory/:id",function(req,res){
    HospitalData.findById(req.params.id).populate("allInventoryData").exec(function(err,foundHospital){
        SingleInventory.create({
            inventoryCode:req.body.code,
            inventoryNumber:req.body.number,
            inventoryName:req.body.name
        },function(err,createdInventory){
            if(err){
                console.log(err);
                res.redirect("/hospital/" + foundHospital._id);
            }
            else{
                console.log(createdInventory);
                foundHospital.allInventoryData.push(createdInventory);
                foundHospital.save();
                res.redirect("/hospital/" + foundHospital._id);
            }
        })
    })
})

app.get("/:id/addpersonnel",function(req,res){
    HospitalData.findById(req.params.id).populate("allPersonalData").exec(function(err,foundHospital){
        res.render("newpersonnel.ejs",{hospital:foundHospital});
    })
})

app.post("/newpersonnel/:id",function(req,res){
    HospitalData.findById(req.params.id).populate("allPersonalData").exec(function(err,foundHospital){
        SingleInventory.create({
            qualification:req.body.qualification,
            name:req.body.name
        },function(err,createdPersonnel){
            if(err){
                console.log(err);
                res.redirect("/hospital/" + foundHospital._id);
            }
            else{
                console.log(createdPersonnel);
                foundHospital.allPersonalData.push(createdPersonnel);
                foundHospital.save();
                res.redirect("/hospital/" + foundHospital._id);
            }
        })
    })
})

app.get("/:id/addRooms",function(req,res){
    HospitalData.findById(req.params.id).populate("allRoomData").exec(function(err,foundHospital){
        res.render("newroom.ejs",{hospital:foundHospital});
    })
})

app.post("/newroom/:id",function(req,res){
    HospitalData.findById(req.params.id).populate("allRoomData").exec(function(err,foundHospital){
        SingleInventory.create({
            roomCode:req.body.code,
            roomNumber:req.body.number
        },function(err,createdRoom){
            if(err){
                console.log(err);
                res.redirect("/hospital/" + foundHospital._id);
            }
            else{
                console.log(createdRoom);
                foundHospital.allRoomData.push(createdRoom);
                foundHospital.save();
                res.redirect("/hospital/" + foundHospital._id);
            }
        })
    })
})

app.get("/specificinventory",function(req,res){
    var temp = [];
    HospitalData.find({}).populate("allInventoryData").exec(function(err,foundHospitals){
        if(err){
            console.log(err);
            res.redirect("/");
        }
        else{
            console.log(foundHospitals);
            foundHospitals.forEach(function(hospital){
                var exists = false;
                hospital.allInventoryData.forEach(function(inventory){
                    if(inventory.name == req.body.invname){
                        exists = true;
                    }
                })
                if(exists){
                    temp.push(hospital);
                }
            })
            console.log(temp);
            res.render("inventoryspecific.ejs",{hospitals:temp,keyword:req.body.invname});
        }
    })
})

app.get("/specificroom",function(req,res){
    var temp = [];
    HospitalData.find({}).populate("allRoomData").exec(function(err,foundHospitals){
        if(err){
            console.log(err);
            res.redirect("/");
        }
        else{
            console.log(foundHospitals);
            foundHospitals.forEach(function(hospital){
                var exists = false;
                hospital.allRoomData.forEach(function(room){
                    if(room.code == req.body.code){
                        exists = true;
                    }
                })
                if(exists){
                    temp.push(hospital);
                }
            })
            console.log(temp);
            res.render("roomspecific.ejs",{hospitals:temp});
        }
    })
})

app.get("/specificpersonnel",function(req,res){
    var temp = [];
    HospitalData.find({}).populate("allPersonalData").exec(function(err,foundHospitals){
        if(err){
            console.log(err);
            res.redirect("/");
        }
        else{
            console.log(foundHospitals);
            foundHospitals.forEach(function(hospital){
                var exists = false;
                hospital.allPersonalData.forEach(function(personnel){
                    if(personnel.qualification == req.body.qualification){
                        exists = true;
                    }
                })
                if(exists){
                    temp.push(hospital);
                }
            })
            console.log(temp);
            res.render("personnelspecific.ejs",{hospitals:temp});
        }
    })
})

app.get("/specificdistance",function(req,res){
    var temp = [];
    console.log(req.body.distance3);
    HospitalData.find({}).populate("allLocationData").exec(function(err,foundHospitals){
        if(err){
            console.log(err);
            res.redirect("/");
        }
        else{
            console.log(req.body.distance3);
            console.log(foundHospitals);
            foundHospitals.forEach(function(hospital){
                console.log(parseInt(hospital.distanceOfHospital));
                if(parseInt(req.body.distance3) > parseInt(hospital.distanceOfHospital)){
                    temp.push(hospital);
                }
            })
            console.log(temp);
            res.render("locationspecific.ejs",{hospitals:temp});
        }
    })
})


app.listen(port, function () {
    console.log("Server Has Started!");
  });