const mongoose = require('mongoose');

const AreaSchema = mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Area', AreaSchema);
