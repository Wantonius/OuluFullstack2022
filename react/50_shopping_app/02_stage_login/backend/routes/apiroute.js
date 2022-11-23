const express = require("express");

let router = express.Router();

//DATABASE
let database = [];
let id = 100;

router.get("/shopping",function(req,res) {
	return res.status(200).json(database);
});

router.post("/shopping",function(req,res) {
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

router.delete("/shopping/:id",function(req,res) {
	let id = parseInt(req.params.id,10);
	for(let i=0;i<database.length;i++) {
		if(database[i].id === id) {
			database.splice(i,1);
			return res.status(200).json({message:"Success"});
		}
	}
	return res.status(404).json({message:"Not found"});
})

router.put("/shopping/:id",function(req,res) {
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

module.exports = router;