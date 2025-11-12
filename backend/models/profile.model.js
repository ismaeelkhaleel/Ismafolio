import mongoose from "mongoose";

const profileSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    title: [String],
    email: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
