var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");

/*var data = [
    {
        name: "Arizona",
        image: "https://azbigmedia.com/wp-content/uploads/2019/09/most-valuable-companies-in-Arizona.jpg",
        description: "Put simply, all of the different types and kinds of paragraphs simply involve layering on a different purpose or intent. When students have the right foundation, it’s just that simple. What are you trying to achieve in this paragraph and in your whole composition? What is your purpose right here? Do you wish to describe? Do you want to evaluate? Is your goal to narrate? Is your intent to persuade?"
    },
    {
        name: "Cloud Rest",
        image: "https://www.allconnect.com/wp-content/uploads/2020/03/geo-state-arizona-hero-187557807-tablet-768x329.jpg",
        description: "Put simply, all of the different types and kinds of paragraphs simply involve layering on a different purpose or intent. When students have the right foundation, it’s just that simple. What are you trying to achieve in this paragraph and in your whole composition? What is your purpose right here? Do you wish to describe? Do you want to evaluate? Is your goal to narrate? Is your intent to persuade?"
    },
    {
        name: "lay lay",
        image: "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/arizona_51378888_Full.jpg?crop=0,127,2256,1240&wid=2000&hei=1100&scl=1.128",
        description: "Put simply, all of the different types and kinds of paragraphs simply involve layering on a different purpose or intent. When students have the right foundation, it’s just that simple. What are you trying to achieve in this paragraph and in your whole composition? What is your purpose right here? Do you wish to describe? Do you want to evaluate? Is your goal to narrate? Is your intent to persuade?"
    }
]
function seedDB(){
    //REMOVE ALL CAMPGROUNDS
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("remove campgrounds!");
         //add a few campgrounds
         data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                        //add a few comments
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("create new comment");
                                }
                            }
                        )
                }
            });
        });
    });
}
module.exports = seedDB;*/