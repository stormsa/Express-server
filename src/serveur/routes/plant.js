var router = require('express').Router();
var bodyParser = require('body-parser');
var Plant = require('../models/plant');

// creation des parsers pour lire les rÃ©ponses url
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.use(jsonParser)

router.get('/all', function(req, res){
	console.log("Renvoi la liste des plantes")
	Plant.find({}, function(err, plants){
		if(err){
			response = {
				message: err,
				plants: null
			}
		}
		res.respond(plants, 200)
	});		
});

router.get('/', function(req, res){
	var plantId = req.param('plant_id');
  console.log("Le nom de ma plante est"+plantId)
	Plant.findById(plantId, function(err, plant) {
		if (err) {
			response = {
				message: err,
				plant: null
			}
			res.respond(response, 500)
		}
		// show the one user
		res.respond(plant, 200)
	});
});

router.post('/', function(req, res){
  console.log("Post plant");
	var newPlant = new Plant({
		nom: req.body.name,
		lastArrosage: new Date(req.body.lastArrosage),
		instructions : req.body.instructions,
		description: req.body.description
	})
 console.log("Insertion plante"+newPlant.nom);
	newPlant.save(function(err) {
		var message
		if (err) {
			response = {
				message: err,
				plant: null
			}
			res.respond(response, 500)
		}
		else{
			response = {
				message: "Votre plante a bien Ã©tÃ© sauvegardÃ©e",
				plant: newPlant
			}
			res.respond(response, 200)
		}
	});
});

router.put('/arrose', urlencodedParser, function(req, res){
  if (!req.body) return res.sendStatus(400)
  var plantId = req.body.plant_id;
  Plant.findById(plantId, function(err, plant) {
		if (err) {
			response = {
				message: err,
				plant: null
			}
			res.respond(response, 500)
		}
		var currentDate = new Date();
		plant.lastArrosage = currentDate
		response = {
			message: "Votre plante a bien Ã©tÃ© arrosÃ©e",
			plant: plant
		}
		// show the one user
		res.respond(plant, 200)
	});
});

module.exports = router;