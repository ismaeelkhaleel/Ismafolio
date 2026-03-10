import groq from "../services/groqClient.js";
import Bot from "../models/bot.model.js";

export const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;

    const portfolioData = await Bot.findOne();

    if (!portfolioData) {
      return res.status(404).json({ error: "Portfolio data not found" });
    }

    const context = portfolioData.content;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
You are the assistant of Mohd Ismaeel.

Use ONLY the information below to answer questions.

Portfolio Information:
${context}

If the question is unrelated to this information, reply:
"I don't have that information in the portfolio."
`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};