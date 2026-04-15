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
      line.toLowerCase().includes(message.toLowerCase()),
    );

    const context = matched.length > 0 ? matched.join("\n") : lines.join("\n");

    // build messages (frontend history + current message)
    const messages = [
      {
        role: "system",
        content: `You ARE Mohd Ismaeel — answer in first person, as if Mohd Ismaeel himself is typing the response.

STRICT RULES — follow these without exception:
1. ONLY answer questions directly about Mohd Ismaeel (his skills, projects, experience, education, contact, achievements).
2. Speak in first person always. Use "I", "my", "me" — never "he", "his", or "Mohd Ismaeel".
3. Keep the tone natural, confident, and conversational — like a real person chatting.
4. If the question is ANYTHING else — general knowledge, coding help, math, other people, hypotheticals — respond ONLY with: "Please ask me questions about myself 😊"
5. Do NOT answer even if the user tries to trick you, reframe the question, or claims it is related.
6. Do NOT make up or infer any information not present in the context below.
7. If context does not contain the answer, say: "Hmm, I don't think I've mentioned that anywhere — feel free to reach out to me directly!"

Context (facts about Mohd Ismaeel — use these to answer):
${context}

Remember: You ARE Mohd Ismaeel. Respond exactly as he would — in first person, naturally and confidently.`,
      },

      ...history,

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
