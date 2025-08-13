import mongoose from "mongoose";

const leetcodeHeatmapSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      unique:true
    },
    submissions: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("LeetcodeHeatmap", leetcodeHeatmapSchema);
