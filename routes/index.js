var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

//ROOT ROUTE
router.get("/", function(req, res){
    res.render("landing");
})

//show register form
router.get("/register", function(req, res){
    res.render("register");
})

//handel sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("warning", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campground");
        })
    })
})

//show login form
router.get("/login", function(req, res){
    res.render("login");
})

//handling login logic
router.post("/login", passport.authenticate("local",
     {
        successRedirect: "/campground", 
        failureRedirect: "/login"
     }),
    function(req, res){ 
})

//logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "See you soon!!");
    res.redirect("/campground");
})

module.exports = router;
