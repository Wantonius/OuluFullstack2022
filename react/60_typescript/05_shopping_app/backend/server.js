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

app.delete("/api/shopping/:id",function(req,res) {
	let id = parseInt(req.params.id,10);
	for(let i=0;i<database.length;i++) {
		if(database[i].id === id) {
			database.splice(i,1);
			return res.status(200).json({message:"Success"});
		}
	}
	return res.status(404).json({message:"Not found"});
})

app.put("/api/shopping/:id",function(req,res) {
	let id = parseInt(req.params.id,10);
	let item = {
		id:id,
		type:req.body.type,
		count:req.body.count,
		price:req.body.price
	}
	for(let i=0;i<database.length;i++) {
		if(database[i].id === id) {
			database.splice(i,1,item);
			return res.status(200).json({message:"Success"});
		}
	}
	return res.status(404).json({message:"Not found"});	
})

app.listen(port);

console.log("Running in port",port);