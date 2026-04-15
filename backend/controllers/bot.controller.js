import Bot from "../models/bot.model.js";
import groq from "../services/groqClient.js";

export const chatWithBot = async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    console.log("Received message:", history);

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const portfolioData = await Bot.findOne();
    if (!portfolioData) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    // simple context filtering
    const lines = portfolioData.content.split("\n").filter(Boolean);

    const matched = lines.filter((line) =>
      line.toLowerCase().includes(message.toLowerCase())
    );

    const context =
      matched.length > 0 ? matched.join("\n") : lines.join("\n");

    // build messages (frontend history + current message)
    const messages = [
      {
        role: "system",
        content: `You are Mohd Ismaeel's portfolio assistant.

Answer ONLY using the context below.

Context:
${context}

If not related, say:
"Please ask questions related to Mohd Ismaeel."`,
      },

      // frontend history (already structured)
      ...history,

      // current user message
      {
        role: "user",
        content: message,
      },
    ];

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages,
    });

    const reply = response.choices[0].message.content;

    res.json({ reply });
  } catch (error) {
    console.error("chatWithBot error:", error);
    res.status(500).json({ error: error.message });
  }
};