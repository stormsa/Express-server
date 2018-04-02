var http = require('http');
// Get the url
var url = require("url");
// Get the environnements variables
require('dotenv').config()
// Que the query paramaters
var querystring = require('querystring');
var express = require('express');
var telegramBot = require('./telegramBot')
var fs = require("fs");
var app = express();

// Connexion db
var mongoose = require('mongoose');
var url = process.env.DB_URL

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
mongoose.connect(url, options);
var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'Erreur lors de la connexion')); 
db.once('open', function (){
    console.log("Connexion à la base OK"); 
}); 

// Initialisation des routes
app.use(express.static(__dirname+'./../../'))
app.use('/plant', require('./routes/plant'));

app.get("/dashboard", function(req, res) {
	console.log("Renvoi le site web dashboard ");
	app.use(express.static("./src/client/dashboard_pi/"));
    fs.readFile("./src/client/dashboard_pi/index.html", "UTF-8", function(err, html){
		if (err) {
			return console.log(err);
		}
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(html);
    })
});


console.log("Demarrage du serveur reussi ")
require('./response')

app.listen(8000)