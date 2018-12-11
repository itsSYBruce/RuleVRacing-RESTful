var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/",function(req, res) {
    res.render("home.ejs");
    //res.send("<h1>hey hey</h1> <h2>haha<h/2>");
})

app.get("/love/:thing",function(req, res) {
    var thing = req.params.thing;
    //res.send("you fell in love with " + thing);
    res.render("love.ejs", {thingVar:thing});
})

app.get("/posts",function(req, res) {
    var posts = [
        {title: "The office", author: "MS"},
        {title: "P and R", author: "LN"},
        {title: "The arrow", author: "JO"}
    ];
    res.render("posts.ejs", {posts:posts});
})


app.listen(process.env.PORT, process.env.HOST, function() {
    console.log("server listening");
})