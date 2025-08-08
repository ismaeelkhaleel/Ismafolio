import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    default: 'ismaeel_bin_khaleel',
    unique: true,
    required: true,
  },
  name: {
    type: String,
    default: 'Mohd Ismaeel',
  },
  password: {
    type: String,
    default: 'ai@ismaeel',
    required: true,
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;