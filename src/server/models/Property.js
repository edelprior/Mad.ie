const Property = require('../models/Property.js');
const mongoose = require('mongoose');

const PropertySchema = mongoose.Schema({
  name: String,
  size: String,
  area_id : { type: mongoose.Schema.Types.ObjectId, ref: 'Area' }
});

module.exports = mongoose.model('Property', PropertySchema);
