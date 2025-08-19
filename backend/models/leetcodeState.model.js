import mongoose from "mongoose";

const leetcodeStateSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    point: {
      type: Number,
      required: true,
    },
    starRating: {
      type: Number,
      required: true,
    },
    ranking: {
      type: Number,
      required: true,
    },
    profileUrl: {
      type: String,
      required: true,
    },
    acSubmissionNum: [
      {
        difficulty: { type: String },
        count: { type: Number },
        submissions: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("LeetcodeState", leetcodeStateSchema);
