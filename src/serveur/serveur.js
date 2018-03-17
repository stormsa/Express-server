var http = require('http');
// Get the url
var url = require("url");
// Que the query paramaters
var querystring = require('querystring');
var express = require('express');
var bodyParser = require('body-parser')
var MongoClient  = require("mongodb").MongoClient;
var MongoObjectID = require("mongodb").ObjectID;
var urlencodedParser = bodyParser.urlencoded({extended:false})
var app = express();

app.use(express.static(__dirname+'./../../'))

MongoClient.connect("mongodb://localhost/dashboard", function(error, db) {
	if (error) throw error;
	console.log("Connecté à la base de donnée dashboard")
	db.collection("plants").find().toArray(function(error, results){
		if(error) throw error;
		var plants = []
		results.forEach(function(i, obj){
			var plant = {
				id : obj._id.toString(),
				nom: obj.name,
				lastArrosage: obj.lastArrosage,
				instructions : obj.instructions
			}
		}
	}
}
// create application/json parser 
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false })
console.log("hello ")
require('./response')

app.get('/plant', function(req, res){
	var plantId = req.body.plant_id;
	var plantToFind = {_id : new MongoObjectID(idToFind)};
	db.collection("plants").findOne(objToFind, function(error, result){
		if(error) throw error
		var plant = {
			id : obj._id.toString(),
			nom: obj.name,
			lastArrosage: obj.lastArrosage,
			instructions : obj.instructions		
		}
	}
	res.respond(plant, 200)
});
app.post('/plant', function(req, res){
	var newPlant = {
			nom: req.body.name,
			lastArrosage: req.body.lastArrosage,
			instructions : req.body.instructions		
		}
	db.collection("plants").insert(newPlant, function(error, result){
		if(error) throw error
		 console.log("save plant")
	}
	response = {
		message: "Votre plante a bien été sauvegardée",
		nextArrosage: "15 jours"
	}
	res.respond(response, 200)
 
});
app.put('/arrosePlant', urlencodedParser, function(req, res){
  if (!req.body) return res.sendStatus(400)
  console.log(req.body.plant_name)
  response = {
    message: "Votre plante a bien été arrosée",
    nextArrosage: "15 jours"
  }
  res.respond(response, 200)
});

app.listen(8000)