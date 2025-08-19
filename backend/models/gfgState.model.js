import mongoose from "mongoose";

const gfgStateSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  instituteRank: {
    type: Number,
    required: true,
  },
  currentStreak: {
    type: Number,
    required: true,
  },
  codingScore: {
    type: Number,
    required: true,
  },
  monthlyScore: {
    type: Number,
    required: true,
  },
  totalProblemsSolved: {
    type: Number,
    required: true,
  },
  profileUrl: {
    type: String,
    required: true,
  },
});

export default mongoose.model("GfgState", gfgStateSchema);