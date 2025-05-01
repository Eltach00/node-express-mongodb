const Mongoose = require('mongoose');

const postSchema = new Mongoose.Schema({
  name: { required: true, type: String },
});

module.exports = Mongoose.model('post', postSchema);
