var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema=new mongoose.Schema({
	name:String,
	age:Number,
	temparament:String
});
//compiling to a model
var Cat= mongoose.model("Cat",catSchema);

// var george=new Cat({
// 	name:"mrs haris",
// 	age:5,
// 	temparament:"cool"
// });
// george.save(function(err,cat){
// 	if(err){
// 		console.log("something went wrong");
// 	}else{
// 		console.log(cat);
// 	}
// });
Cat.create({
	name:"snow",
	age:15,
	temparament:"Bland"
},function(err,cat){
	if(err){
		console.log(err);
	}else{
		console.log(cat);
	}
})
Cat.find({},function(err,cats){
	if(err){
	console.log(err);	
	}else{
		 console.log("all the cats");
		console.log(cats);
		 }})
