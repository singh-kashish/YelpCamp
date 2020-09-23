var express    =      require("express");
var app        =      express();
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");
var bodyParser =      require("body-parser"),
	passport   =      require("passport"),
	LocalStrategy=require("passport-local");
app.use(bodyParser.urlencoded({extended:true}));
//mongoose
var mongoose   =      require("mongoose");
mongoose.connect("mongodb+srv://KASHISH:Gabbar@1212@yelpcamp.rtsyy.mongodb.net/YelpCamp?retryWrites=true&w=majority",{useUnifiedTopology:true,useNewUrlParser:true});
var flash=require("connect-flash")

var Campground =      require("./models/campground"),
	User       =      require("./models/user"),
	seedDB     =      require("./seeds");
var methodOverride   =require("method-override");
app.use(methodOverride("_method"));
//seedDB();
var Comment=require("./models/comment");
//Passport config
app.use(require("express-session")({
	secret:"Once again Rusty wins cutest dog",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());
app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
});

//requiring routes
var commentRoutes        =      require("./routes/comments"),
	campgroundRoutes     =      require("./routes/campgrounds"),
	authRoutes           =      require("./routes/index");
app.use("/campgrounds/:id/comments",commentRoutes);
app.use(authRoutes);
app.use("/campgrounds",campgroundRoutes);
app.listen(process.env.PORT,process.env.IP,function(){
	console.log("YelpCamp server started");
})