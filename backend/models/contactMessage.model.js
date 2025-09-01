import mongoose from "mongoose";

const contactMessageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: "Unknown",
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);
export default ContactMessage;
