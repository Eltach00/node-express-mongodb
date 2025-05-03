import Mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
const userSchema = new Mongoose.Schema({
  email: { required: true, type: String, unique: true },
  password: { required: true, type: String },
});
userSchema.plugin(uniqueValidator, { message: 'Email already exists' });

export default Mongoose.model('User', userSchema);
