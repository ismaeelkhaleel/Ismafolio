import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Intermediate",
  },
  rating: {
    type: Number,
    required: true,
  },
  icon: {
    type: String,
    default: "",
  },
}, { timestamps: true });

export default mongoose.model("Skill", skillSchema);
