import mongoose from "mongoose";

export const SKILL_CATEGORIES = [
  "Backend",
  "Frontend",
  "Mobile",
  "Tools",
  "Cloud",
  "Database",
  "Programming",
  "DevOps",
  "Other",
];

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    enum: SKILL_CATEGORIES,
    required: true,
    default: "Other",
    trim: true,
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
