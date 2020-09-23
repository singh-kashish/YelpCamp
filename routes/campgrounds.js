var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var middleware=require("../middleware");

router.get("",function(req,res){
	//get all campgrounds from mongodb
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log(err)
		}
		else{
			res.render("campgrounds/index",{campgrounds:allCampgrounds})
		}
	})
	
	
});
router.post("/",middleware.isLoggedIn,function(req,res){
	var author={
		id:req.user._id,
		username:req.user.username
		}
	//get data from form and add to campgrounds array
	var name=req.body.name;
	var price=req.body.name;
	var image=req.body.image;
	var description=req.body.description;
	var newCampground={name: name,price:price,image: image,description: description,author:author};
	
	
	Campground.create(newCampground,function(err,newlyCreated){
		if(err){
			console.log(err);
		}
		{
			res.redirect("/campgrounds");
		}
	})
	
	//redirect back to campgrounds
	// res.redirect("/campgrounds");
});
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new");
});
//show - shows more info about one campground
router.get("/:id",function(req,res){
	//find the campground with the provided id
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
		}
		else{
			//render show template with that campground
	res.render("campgrounds/show",{campground:foundCampground});
		}
			
		
	})
// res.send("this will be a show page")
})

//edit campground route 
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
Campground.findById(req.params.id,function(err,foundCampground){
			res.render("campgrounds/edit",{campground:foundCampground});
	});
});
	
	

//otherwise,redirect
//if not ,redirect	
	
//update campground route
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
	//find and update the correct campground
	
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	})
})
//destroy campground route
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
		Campground.findByIdAndRemove(req.params.id,function(err){
			if(err){
				res.redirect("/campgrounds");
			}
			else{
				res.redirect("/campgrounds");
			}
		})
			  })



module.exports=router;