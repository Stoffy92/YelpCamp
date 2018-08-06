
var express         = require("express"),
    app             = express(),
    flash           = require("connect-flash"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    seedDB          = require("./seed"),
    passport        = require("passport"),
    User            = require("./models/user"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override");
    
    
var commentRoutes     = require("./routes/comments"),
    campgroundRoutes  = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index");


mongoose.connect("mongodb://localhost/yelp_camp_v12"); // DB Connection 
app.use(flash());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); //ejs viewing engine, get rid of .ejs
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// seedDB(); // Populate database with dummy data

// Passport Config
app.use(require("express-session")({
  secret: "Hulk smash",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize()); 
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){ // Middleware that checks if user is logged in for every route
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next(); // Moves onto next line of code
});

// Route files
app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

// Server listening
app.listen(process.env.PORT, process.env.IP, function() {
  console.log("Server has Started!");
});