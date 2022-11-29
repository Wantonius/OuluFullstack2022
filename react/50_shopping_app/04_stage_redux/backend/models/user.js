const mongoose = require("mongoose");

let Schema = mongoose.Schema({
	username:{type:String,unique:true},
	password:String
});

module.exports = mongoose.model("User",Schema);

/*
	Multiple login sources, password, facebook, google etc...
	
let Schema = mongoose.Schema({
	local:{
		username:{type:String,unique:true},
		password:String
	},
	facebook: {
		<facebook login stuff>
	},
	google:{
		<google login stuff>
	}
})
*/