var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// index -show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campground: allCampgrounds, currentUser: req.user});
        }
    });
});

// creat
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name  = req.body.name;
    var image = req.body.image;
    var desc  = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: desc, author: author}
    // creat a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreatedCampground){
        if(err){
            console.log(err);
        } else {
            //redirect back to campground page
           // console.log(newlyCreated);
            req.flash("success", "congratulations!");
            res.redirect("/campground");
        }
    });
});

// new
router.get("/new", middleware.isLoggedIn, function(req, res){  
    res.render("campgrounds/new");
});

// show
router.get("/:id", function(req, res){
   //find the campground with provided ID
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err || !foundCampground){
           req.flash("error", "Campground not found!");
           res.redirect("back");
       } else {
           console.log(foundCampground);
            //render show template with that campground           
            res.render("campgrounds/show", {campground: foundCampground});
       }
   });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
       res.render("campgrounds/edit", {campground: foundCampground});
     });
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           //redirect somewhere(show page)
           res.redirect("/campground/" + req.params.id);
       }
    })
})

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndDelete(req.params.id, function(err){
        if(err){
           
            res.redirect("/campgrounds")
        } else {
            req.flash("success", "Campground deleted!!");
            res.redirect("/campground")
        }
    })
})

module.exports = router;