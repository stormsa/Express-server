var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var plantSchema = mongoose.Schema({
    nom: String, 
    lastArrosage: Date, 
    instructions: String, 
    description: String
})

var Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;