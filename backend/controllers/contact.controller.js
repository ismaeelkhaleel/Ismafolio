import ContactMessage from "../models/contactMessage.model.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.BREVO_EMAIL,
    pass: process.env.BREVO_API_KEY,
  },
});

const sendEmail = async (email, name) => {
  try {
    const displayName = name && name.trim() !== "" ? name : "there";

    const mailOptions = {
      from: `"Mohd Ismaeel" <${process.env.BREVO_EMAIL}>`,
      to: email,
      subject: "Thank You for Contacting Us",
      text: `Hi ${displayName},\n\nThank you for reaching out! We’ve received your message and will get back to you shortly.\n\nBest regards,\nMOHD ISMAEEL`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email to user ❌:", error.message);
  }
};

const sendEmailToAdmin = async ({ name, email, message }) => {
  try {
    const displayName = name && name.trim() !== "" ? name : "unknown";

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.BREVO_EMAIL}>`,
      to: process.env.BREVO_EMAIL,
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
    console.error("Error sending email to admin ❌:", error.message);
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
    sendEmailToAdmin(name, email, message);
    res.status(201).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    console.error("Error creating contact message:", error);
    return res.status(500).json({ message: "Error creating contact message" });
  }
};
