import Mongoose from 'mongoose';

const postSchema = new Mongoose.Schema({
  name: { required: true, type: String },
  imagePath: String,
});

export default Mongoose.model('post', postSchema);
