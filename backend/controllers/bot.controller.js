import Bot from "../models/bot.model.js";
import  llm  from "../services/groqClient.js";
import { BufferMemory } from "langchain/memory"; // ✅ 0.2 mein kaam karta hai

const sessionMemories = new Map();

function getMemory(sessionId) {
  if (!sessionMemories.has(sessionId)) {
    sessionMemories.set(sessionId, new BufferMemory());
  }
  return sessionMemories.get(sessionId);
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

    const memory = getMemory(sessionId);
    const memoryVars = await memory.loadMemoryVariables({});
    const chatHistory = memoryVars.history || "";

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

    await memory.saveContext({ input: message }, { output: reply });

    res.json({ reply });
  } catch (error) {
    console.error("chatWithBot error:", error);
    res.status(500).json({ error: error.message });
  }
};
