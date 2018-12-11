console.log("steel rusty tuna");

//start express
let express = require("express");
var app = express();


//request and response in function()
app.get("/", function(req, res) {
    //send back
    res.send("hello tuna");
})

app.get("/bye", function(req, res) {
    //send back
    res.send("bye tuna");
})

app.get("/scarn", function(req, res) {
    //send back
    res.send("threat level midnight");
})

app.get("/r/:subredditName", function(req, res) {
    //send back
    res.send("https://www.reddit.com");
})

app.get("/r/:subredditName/comments/:id/:title/", function(req, res) {
    //send back
    console.log(req.params);
    res.send("comments");
})

app.get("*", function(req, res) {
    //send back
    res.send("anyhow anywho");
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("started");
});


// app.get("/")