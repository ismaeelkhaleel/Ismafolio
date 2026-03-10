import mongoose from "mongoose";

const botSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Bot", botSchema);
