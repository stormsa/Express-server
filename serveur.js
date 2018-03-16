var http = require('http');
// Get the url
var url = require("url");
// Que the query paramaters
var querystring = require('querystring');
var express = require('express');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({extended:false})
var app = express();

ap.use(express.static(__dirname+'./../../'))

// create application/json parser 
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

require('./response')

app.get('/plant', function(req, res)){
  console.log("Get last arrosage for the plant")
}
app.post('/plant', function(req, res)){
  console.log("save plant")
}
app.put('/arrosePlant', urlencodedParser, function(req, res)){
  if (!req.body) return res.sendStatus(400)
  console.log(req.body.plant_name)
  response = {
    message: "Votre plante a bien été arrosée",
    nextArrosage: "15 jours"
  }
  res.respond(response, 200)
}

app.listen(8000)