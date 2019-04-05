const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  comment: String,
  property_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' }
});

module.exports = mongoose.model('Comment', CommentSchema);
