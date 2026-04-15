import Bot from "../models/bot.model.js";
import { llm } from "../services/groqClient.js";

import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { BufferMemory } from "langchain/memory";

const memory = new BufferMemory();

export const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;

    const portfolioData = await Bot.findOne();
    if (!portfolioData) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    // 1. Split content
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50,
    });

    const docs = await splitter.createDocuments([portfolioData.content]);

    // 2. Create vector store
    const vectorStore = await MemoryVectorStore.fromDocuments(
      docs,
      new OpenAIEmbeddings({
        apiKey: process.env.OPENAI_API_KEY,
      })
    );

    const retriever = vectorStore.asRetriever();

    // 3. Get relevant context
    const relevantDocs = await retriever.invoke(message);
    const context = relevantDocs.map((d) => d.pageContent).join("\n");

    // 4. Get memory history
    const memoryVars = await memory.loadMemoryVariables({});
    const chatHistory = memoryVars.history || "";

    // 5. Call LLM
    const response = await llm.invoke([
      {
        role: "system",
        content: `
You are Mohd Ismaeel.

Answer ONLY using this context:
${context}

Conversation history:
${chatHistory}

If answer not found, say:
"Please ask questions related to Mohd Ismaeel"
`,
      },
      {
        role: "user",
        content: message,
      },
    ]);

    // 6. Save memory
    await memory.saveContext(
      { input: message },
      { output: response.content }
    );

    res.json({ reply: response.content });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};