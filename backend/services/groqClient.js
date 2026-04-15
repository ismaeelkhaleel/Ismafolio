import Groq from "groq-sdk";

const llm = new Groq({
  apiKey: process.env.GROQ_API_KEY,
  model:"llama3-8b-8192",
  temperature: 0,
});

export default llm;