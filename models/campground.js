var mongoose=require("mongoose");
//schema
var campgroundSchema=new mongoose.Schema({
	name:String,
	price:String,
	image:String,
	description:String,
	createdAt:{type:Date,default:Date.now},
	author:{
		id:{type:mongoose.Schema.Types.ObjectId,
		   ref:"User"},
		username:String
	},
	comments:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Comment"
		}
	]
});
//model export
module.exports=mongoose.model("Campground",campgroundSchema);