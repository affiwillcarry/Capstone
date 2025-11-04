import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import OpenAI from "openai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Static + JSON middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Pages
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "views", "index.html")));
app.get("/book", (req, res) => res.sendFile(path.join(__dirname, "views", "book.html")));
app.get("/confirmation", (req, res) => res.sendFile(path.join(__dirname, "views", "confirmation.html")));
app.get("/chat", (req, res) => res.sendFile(path.join(__dirname, "views", "chat.html")));

// Setup OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY  // make sure this variable is set
});

// Chat API endpoint
app.post("/api/chat", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required." });
  }

  try {
    // call OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // or another model you choose
      messages: [
        { role: "system", content: "You are a helpful healthcare assistant giving general suggestions. Always include a disclaimer that this is not medical advice." },
        { role: "user", content: question }
      ],
      max_tokens: 300,
      temperature: 0.7
    });

    const answer = response.choices?.[0]?.message?.content ?? "Sorry, I cannot answer that right now.";

    res.json({ answer });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ error: "Failed to generate answer." });
  }
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
});
