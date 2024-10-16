const mongoose = require('mongoose');

const beefSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
});

const Beef = mongoose.model('Beef', beefSchema);
module.exports = Beef;