import Bot from "../models/bot.model.js";
import llm  from "../services/groqClient.js";

const sessionHistories = new Map();

function getHistory(sessionId) {
  if (!sessionHistories.has(sessionId)) {
    sessionHistories.set(sessionId, []);
  }
  return sessionHistories.get(sessionId);
}

export const chatWithBot = async (req, res) => {
  try {
    const { message, sessionId = "default" } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const portfolioData = await Bot.findOne();
    if (!portfolioData) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    const lines = portfolioData.content.split("\n").filter(Boolean);
    const matched = lines.filter((line) =>
      line.toLowerCase().includes(message.toLowerCase()),
    );
    const context = matched.length > 0 ? matched.join("\n") : lines.join("\n");

    const history = getHistory(sessionId);
    const chatHistory = history
      .map((h) => `User: ${h.input}\nAssistant: ${h.output}`)
      .join("\n");

    const response = await llm.invoke([
      {
        role: "system",
        content: `You are Mohd Ismaeel's portfolio assistant. Answer questions only about Mohd Ismaeel using the context below.

Context:
${context}

Chat History:
${chatHistory}

If the question is not related to Mohd Ismaeel, respond with:
"Please ask questions related to Mohd Ismaeel."`,
      },
      {
        role: "user",
        content: message,
      },
    ]);

    const reply = response.content;

    history.push({ input: message, output: reply });
    if (history.length > 10) history.shift();

    res.json({ reply });
  } catch (error) {
    console.error("chatWithBot error:", error);
    res.status(500).json({ error: error.message });
  }
};
