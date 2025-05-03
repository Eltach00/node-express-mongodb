import Mongoose from 'mongoose';

const postSchema = new Mongoose.Schema({
  name: { required: true, type: String },
  imagePath: String,
  creator: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default Mongoose.model('Post', postSchema);
