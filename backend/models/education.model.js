import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: true,
  },
  institute: {
    type: String,
    required: true,
  },
  startYear: {
    type: Number,
    required: true,
  },
  endYear: {
    type: Number,
  },
  description: {
    type: String,
    default: '',
  }
}, { timestamps: true });

export default mongoose.model('Education', educationSchema);