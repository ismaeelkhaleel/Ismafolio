import ContactMessage from "../models/contactMessage.model.js";
import nodemailer from "nodemailer";

const sendEmail = async (email, name) => {
  try {
    const displayName = name && name.trim() !== "" ? name : "there";
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank You for Contacting Us",
      text: `Hi ${displayName},\n\nThank you for reaching out! We’ve received your message and will get back to you shortly.\n\nBest regards,\nMOHD ISMAEEL`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const contact = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }
    const newMessage = await ContactMessage.create({ name, email, message });
    sendEmail(email, name);
    res.status(201).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    console.error("Error creating contact message:", error);
    return res.status(500).json({ message: "Error creating contact message" });
  }
};
