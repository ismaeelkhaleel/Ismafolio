import mongoose from "mongoose";

const userProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    enum: ['LeetCode', 'GFG', 'Codeforces', 'CodeChef', 'HackerRank', 'Other'],
    required: true,
  },
  problemUrl: {
    type: String,
    required: true,
  },
  tags: [String],
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Easy",
  },
},{timestamps:true});

export default mongoose.model("UserProblem", userProblemSchema);
