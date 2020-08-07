var express    = require("express"),
    app        = express (),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    flash      = require("connect-flash"),
    passport   = require("passport"),
    LocalStrategy=require("passport-local"),
    methodOverride=require("method-override"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    User       = require("./models/user"),
    seedDB     = require("./seeds");
//const port     = 3000;
var port = process.env.PORT || 3000;

var commentRoutes =  require("./routes/comments"),
    campgroundRoutes =  require("./routes/campgrounds"),
    indexRoutes   =  require("./routes/index");

console.log(process.env.DATABASEURL);

//seedDB(); //seed the database
//mongodb://localhost:27017/yelp_camp_v9
//"mongodb+srv://rana:dbrana@cluster0.hjfly.mongodb.net/yelp_camp?retryWrites=true&w=majority"
mongoose.connect(process.env.DATABASEURL,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('Connected to DB!');
}).catch(err => {
    console.log('Error', err.message);
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "once again I'm happy!",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    res.locals.warning = req.flash("warning");
    res.locals.success = req.flash("success");
    res.locals.currentUser = req.user;
    next();
})

//REQUiRING ROUTES
app.use(indexRoutes);
app.use("/campground", campgroundRoutes);
app.use("/campground/:id/comments", commentRoutes);

//app.listen(port, () => console.log('Example app listening at http://localhost:${port}'));
app.listen(port);