var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var plantSchema = Schema({
    nom: String, 
    lastArrosage: String, 
    instructions: String, 
    description: String
});

var Plant = mongoose.model('plant', plantSchema);
module.exports = Plant;