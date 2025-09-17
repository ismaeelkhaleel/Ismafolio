import ContactMessage from "../models/contactMessage.model.js";
import axios from "axios";

const sendEmail = async (email, name) => {
  try {
    const displayName = name && name.trim() !== "" ? name : "there";

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { email: process.env.BREVO_EMAIL, name: "Mohd Ismaeel" },
        to: [{ email, name: displayName }],
        subject: "Thank You for Contacting Us",
        htmlContent: `
          <p>Hi ${displayName},</p>
          <p>Thank you for reaching out! We’ve received your message and will get back to you shortly.</p>
          <p>Best regards,<br/>MOHD ISMAEEL</p>
        `,
        textContent: `Hi ${displayName},\n\nThank you for reaching out! We’ve received your message and will get back to you shortly.\n\nBest regards,\nMOHD ISMAEEL`,
      },
      {
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(
      "Error sending email to user ❌:",
      error.response?.data || error.message
    );
  }
};

const sendEmailToAdmin = async ({ name, email, message }) => {
  try {
    const displayName = name && name.trim() !== "" ? name : "unknown";

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { email: process.env.BREVO_EMAIL, name: "Portfolio Contact" },
        to: [{ email: process.env.EMAIL_USER, name: "Admin" }],
        subject: `New Contact Message from ${displayName}`,
        htmlContent: `
          <h2>New Contact Message</h2>
          <p><b>Name:</b> ${displayName}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b><br/>${message}</p>
          <hr/>
          <small>This message was sent via your portfolio contact form.</small>
        `,
        textContent: `
You have received a new message from your portfolio:

Name: ${displayName}
Email: ${email}
Message:
${message}
        `,
      },
      {
        headers: {
          accept: "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(
      "Error sending email to admin ❌:",
      error.response?.data || error.message
    );
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
    sendEmailToAdmin({ name, email, message });

    res.status(201).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    console.error("Error creating contact message:", error);
    return res.status(500).json({ message: "Error creating contact message" });
  }
};
