import mongoose from "mongoose";

const leetcodeProblemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      default: "LeetCode",
      required: true,
    },
    titleSlug: {
      type: String,
      required: true,
    },
    solvedOn: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("LeetcodeProblem", leetcodeProblemSchema);
