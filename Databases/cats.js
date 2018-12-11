var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/PC", { useNewUrlParser: true });

//pattern
var Schema = new mongoose.Schema({
   name: String,
   age: Number,
   temperament: String
});

//so it knows the schema or pattern
var Cat = mongoose.model("Cat", Schema);


// //adding a new cat to the dataabse
// var scarn = new Cat({
//     name: "Tuna",
//     age: 2,
//     temperament: "Shrug"
// });

// scarn.save(function(err, cat) {
//     if(err) {
//         console.log("something went wrong");
//     }
//     else {
//         console.log("we added a cat");
//         console.log(cat);
//     }
// });


Cat.create({
    name: "beet",
    age: 35,
    temperament: "weird"
}, function(err, cat) {
    if(err) {
        console.log("creation failed");
    }
    else {
        console.log(cat);
    }});



//retrieving a cat
Cat.find({}, function(err, cats) {
    if(err) {
        console.log("OH shoot, fire guy");
    }
    else {
        console.log("so many cats....");
        console.log(cats);
    }
})
