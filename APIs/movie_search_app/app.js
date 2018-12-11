var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");



app.get("/", function(req, res) {
   res.render("search"); 
});


app.get("/results", function(req, res) {
    //res.send("hey oh");
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
    request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        var parsed = JSON.parse(body);
        //res.send(parsed["Search"][0]["Title"]);
        res.render("results", {parsed:parsed});
    }
});
});



app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Movie engine started");
});


//http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb
//http://www.omdbapi.com/?i=tt3896198&apikey=thewdb