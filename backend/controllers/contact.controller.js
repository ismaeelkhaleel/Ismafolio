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
import nodemailer from "nodemailer";

const sendEmailToAdmin = async ({ name, email, message }) => {
  try {
    const displayName = name && name.trim() !== "" ? name : "unknown";
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Contact Message from ${displayName}`,
      text: `
You have received a new message from your portfolio:

Name: ${displayName}
Email: ${email}
Message:
${message}
      `,
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${displayName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br/>${message}</p>
        <hr/>
        <small>This message was sent via your portfolio contact form.</small>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

export default sendEmailToAdmin;

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
    sendEmailToAdmin(name, email, message);
    res.status(201).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    console.error("Error creating contact message:", error);
    return res.status(500).json({ message: "Error creating contact message" });
  }
};
