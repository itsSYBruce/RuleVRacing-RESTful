var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/PC", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


//Schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//                 name: "Mark Zhao", 
                
//                 image: "https://static1.squarespace.com/static/575b7b93c6fc08a912726ad7/575dbd98d210b82f783dfbbf/599270eed2b8572bae2aad4a/1540846235861/untitled-30.jpg?format=500w",
            
//                 description: "this is our clothing coordinator"
//                 }, function(err, campground) {
//                 if (err) {
//                     console.log("bad creation");
//                 }
//                 else {
//                     console.log(campground);
//                 }    
//             });


        
        
app.get("/", function(req, res) {
    //res.send("hey oh");
    res.render("landing");
})


//INDEX show index
app.get("/campgrounds", function(req, res) {
    //get from DB
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log("wrong");
        }
        else {
            res.render("index", {campgrounds:allCampgrounds}); 
        }
        
    })
});


//CREATE add something to index page
app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newcampground = {name: name, image: image, description: description};
    //campgrounds.push(newcampground);
    //create a new campground and save it to new database
    Campground.create(newcampground, function(err, newcamp) {
        if(err) {
            console.log("create fail");
        }else {
            res.redirect("/campgrounds");
        }
    });
})


//NEW
app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
})



//SHOW more info about the campground
app.get("/campgrounds/:id", function(req, res) {
    //find the campground with that id
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        }else {
            //render show template with that campground
            res.render("show", {camp: foundCampground});
        }
    })
});





app.listen(process.env.PORT, process.env.IP, function() {
    console.log("booted");
});