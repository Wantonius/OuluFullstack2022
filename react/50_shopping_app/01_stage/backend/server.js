const express = require("express");

let app = express();

app.use(express.json());

//DATABASE
let database = [];
let id = 100;

//PORT
let port = process.env.PORT || 3001;

app.use(function(req,res,next) {
	console.log("Hi! I am filter");
	return next();
});

app.get("/api/shopping",function(req,res) {
	return res.status(200).json(database);
});

app.post("/api/shopping",function(req,res) {
	let item = {
		id:id,
		type:req.body.type,
		count:req.body.count,
		price:req.body.price
	}
	database.push(item);
	id++;
	return res.status(201).json(item);
});

app.listen(port);

console.log("Running in port",port);