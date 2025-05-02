import Mongoose from 'mongoose';

const postSchema = new Mongoose.Schema({
  name: { required: true, type: String },
});

export default Mongoose.model('post', postSchema);
