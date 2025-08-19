import mongoose from "mongoose";

const gfgProbelmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  titleSlug: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ["school","basic","easy", "basic", "medium", "hard"],
  },
});

export default mongoose.model("GfgProblem", gfgProbelmSchema);
