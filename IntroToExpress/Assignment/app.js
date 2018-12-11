var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.send("hi there, I'm Michael Scarn");
})

app.get("/speak/:animal", function(req, res) {
    var animal = req.params.animal;
    res.send("you cant have " + animal + " for dinner");
})


app.get("/speak/:message/:times", function(req, res) {
    var message = req.params.message;
    var times = Number(req.params.times);
    var ret = "";
    for (var i = 0; i < times; i++) {
        ret+= message + " ";
    }
    res.send(ret);
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("hop on");
})