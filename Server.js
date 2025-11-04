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
const apiKey = process.env.AZURE_OPENAI_KEY;
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;

if (!endpoint || !apiKey || !deployment) {
  console.error("❌ Missing Azure OpenAI configuration. Please check your environment variables.");
  process.exit(1);
}

// ✅ Correct class name for SDK v2.1.0
const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Page routes
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "views", "index.html")));
app.get("/book", (req, res) => res.sendFile(path.join(__dirname, "views", "book.html")));
app.get("/confirmation", (req, res) => res.sendFile(path.join(__dirname, "views", "confirmation.html")));
app.get("/chat", (req, res) => res.sendFile(path.join(__dirname, "views", "chat.html")));

// AI Chat Route
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ reply: "No message provided." });

    const response = await client.getChatCompletions(deployment, [
      {
        role: "system",
        content:
          "You are a friendly AI healthcare assistant. Provide helpful, general health advice and wellness guidance (not medical diagnosis).",
      },
      { role: "user", content: message },
    ]);

    const reply =
      response.choices?.[0]?.message?.content ||
      "⚠️ Sorry, I couldn’t generate a response right now.";

    res.json({ reply });
  } catch (error) {
    console.error("Azure OpenAI error:", error);
    res.json({
      reply: "⚠️ The AI assistant is temporarily unavailable. Please try again later.",
    });
  }
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
