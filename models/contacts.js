

var mongoose = require('mongoose');

var ContactSchema = new mongoose.Schema({
  name: String,
  number: String,
});


mongoose.model('Contact', ContactSchema);


