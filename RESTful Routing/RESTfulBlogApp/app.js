var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");

//MONGOOSE CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app",  { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
//MONGOOSE/MODEL 
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
})
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create( {
//     title: "mark",
//     image: "https://static1.squarespace.com/static/575b7b93c6fc08a912726ad7/575dbd98d210b82f783dfbbf/599270eed2b8572bae2aad4a/1540846235861/untitled-30.jpg?format=500w",
//     body: "body"
// })
//RESTFUL ROUTES
app.get("/", function(req, res) {
    res.redirect("/blogs");
})


//INDEX
app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if(err) {
            console.log("err");
        } else {
            res.render("index", {blogs: blogs});
        }
    })
})

//NEW
app.get("/blogs/new", function(req, res) {
    res.render("new");
})


//CREATE
app.post("/blogs", function(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog) {
        if (err) {
            res.render("new");
        }
        else {
            res.redirect("/blogs");
        }
    })
})


//SHOW
app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if (err) {
            console.log(err);
            res.redirect("/blogs");
        }
        else {
            res.render("show", {blog: foundBlog});
        }
    });
    //res.send("SHOW PAGE");
})

//EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
})

//UPDATE
app.put("/blogs/:id", function(req, res){
      req.body.blog.body = req.sanitize(req.body.blog.body);
      Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
      if(err){
          res.redirect("/blogs");
      }  else {
          res.redirect("/blogs/" + req.params.id);
      }
   });
});

//
app.delete("/blogs/:id", function(req, res) {
    Blog.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/blogs");
        }
        else {
             res.redirect("/blogs");
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("sail the boat captain");
})