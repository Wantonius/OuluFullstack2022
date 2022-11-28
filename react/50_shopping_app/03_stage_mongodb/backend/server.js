const express = require("express");
const apiroute = require("./routes/apiroute");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mongoose = require("mongoose");
const userModel = require("./models/user");

let app = express();

app.use(express.json());

//PORT
let port = process.env.PORT || 3001;

//LOGIN DATABASES

let registeredUsers = [];
let loggedSessions = [];
let time_to_live_diff = 3600000;

//MONGOOSE CONNECTION

const mongo_user = process.env.MONGODB_USER;
const mongo_password = process.env.MONGODB_PASSWORD;
const mongo_url = process.env.MONGODB_URL;

const url = "mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+"/oulushopping?retryWrites=true&w=majority"

mongoose.connect(url).then(
	() => console.log("Connected to Mongodb"),
	(err) => console.log("Failed to connect to Mongodb. Reason",err)
);

mongoose.set("toJSON",{virtuals:true});

//MIDDLEWARE

createToken = () => {
	let token = crypto.randomBytes(64);
	return token.toString("hex");
}

isUserLogged = (req,res,next) => {
	if(!req.headers.token) {
		return res.status(403).json({message:"Forbidden"});
	}
	for(let i=0;i<loggedSessions.length;i++) {
		if(req.headers.token === loggedSessions[i].token) {
			let now = Date.now();
			if(loggedSessions[i].ttl < now) {
				loggedSessions.splice(i,1);
				return res.status(403).json({message:"Forbidden"});
			}
			loggedSessions[i].ttl = now + time_to_live_diff;
			req.session = {};
			req.session.user = loggedSessions[i].user;
			return next();
		}
	}
	return res.status(403).json({message:"Forbidden"})
}

//LOGIN API

app.post("/register",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Bad request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({message:"Bad request"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({message:"Bad request"});
	}
	bcrypt.hash(req.body.password,14,function(err,hash) {
		if(err) {
			return res.status(500).json({message:"Internal server error"})
		}
		let user = new userModel({
			"username":req.body.username,
			"password":hash
		})
		user.save(function(err,user) {
			if(err) {
				console.log("Failed to create user. Reason",err);
				if(err.code === 11000) {
					return res.status(409).json({message:"Username is already in use"})
				}
				return res.status(500).json({message:"Internal server error"})
			}
			if(!user) {
				return res.status(500).json({message:"Internal server error"})
			}
			return res.status(201).json({message:"User registered!"})
		})
	})
})

app.post("/login",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Bad request"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({message:"Bad request"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({message:"Bad request"});
	}
	for(let i=0;i<registeredUsers.length;i++) {
		if(req.body.username === registeredUsers[i].username) {
			bcrypt.compare(req.body.password,registeredUsers[i].password,function(err,success) {
				if(err) {
					return res.status(500).json({message:"Internal server error"})
				}
				if(!success) {
					return res.status(401).json({message:"Unauthorized"});
				}
				let token = createToken();
				let now = Date.now();
				loggedSessions.push({
					token:token,
					user:req.body.username,
					ttl:now+time_to_live_diff
				});
				return res.status(200).json({token:token})
			})
			return;
		}
	}
	return res.status(401).json({message:"Unauthorized"});
})

app.post("/logout",function(req,res) {
	if(!req.headers.token) {
		return res.status(404).json({message:"Not found"})
	}
	for(let i=0;i<loggedSessions.length;i++) {
		if(loggedSessions[i].token === req.headers.token){
			loggedSessions.splice(i,1);
			return res.status(200).json({message:"Logged out"})
		}
	}
	return res.status(404).json({message:"Not found"});
})

app.use("/api",isUserLogged,apiroute);

app.listen(port);

console.log("Running in port",port);