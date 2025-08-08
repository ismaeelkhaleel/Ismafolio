import mongoose from 'mongoose';

const platformStateSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    enum: ['LeetCode', 'GFG', 'Codeforces', 'CodeChef', 'HackerRank', 'Other'],
  },
  totalSolved: {
    type: Number,
    default: 0,
  },
  profileUrl: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('PlatformState', platformStateSchema);
