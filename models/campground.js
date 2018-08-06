var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp_v4"); // DB Connection 
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); //ejs viewing engine, get rid of .ejs

//schema setup
var campgroundSchema = new mongoose.Schema({
   name: String,
   cost: Number,
   image: String,
   description: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
})

module.exports = mongoose.model("campground", campgroundSchema);