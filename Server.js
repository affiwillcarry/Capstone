import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Azure OpenAI setup
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey   = process.env.AZURE_OPENAI_KEY;
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;

if (!endpoint || !apiKey || !deployment) {
  console.error("❌ Azure OpenAI configuration missing. Please set environment variables.");
  process.exit(1);
}

const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes for pages
app.get("/",        (req, res) => res.sendFile(path.join(__dirname, "views", "index.html")));
app.get("/book",    (req, res) => res.sendFile(path.join(__dirname, "views", "book.html")));
app.get("/confirmation", (req, res) => res.sendFile(path.join(__dirname, "views", "confirmation.html")));
app.get("/chat",    (req, res) => res.sendFile(path.join(__dirname, "views", "chat.html")));

// Chat API route using Azure OpenAI
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ reply: "No message provided." });
    }

    const result = await client.getChatCompletions(deployment, {
      messages: [
        { role: "system", content: "You are a helpful healthcare assistant providing general guidance (not medical advice)." },
        { role: "user",   content: message }
      ],
      maxTokens: 300,
      temperature: 0.7,
    });

    const reply = result.choices && result.choices[0] && result.choices[0].message && result.choices[0].message.content
      ? result.choices[0].message.content
      : "❌ Unable to generate response at this time.";

    res.json({ reply });

  } catch (error) {
    console.error("Azure OpenAI error:", error);
    res.json({ reply: "⚠️ The AI assistant is temporarily unavailable. Please try again later." });
  }
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
