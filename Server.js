import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // ✅ Needed for chat API JSON parsing

// Routes
app.get("/", (req, res) => 
  res.sendFile(path.join(__dirname, "views", "index.html"))
);

app.get("/book", (req, res) => 
  res.sendFile(path.join(__dirname, "views", "book.html"))
);

app.get("/confirmation", (req, res) =>
  res.sendFile(path.join(__dirname, "views", "confirmation.html"))
);

// ✅ Chat Support Page Route
app.get("/chat", (req, res) =>
  res.sendFile(path.join(__dirname, "views", "chat.html"))
);

// ✅ AI Chat API (dummy version for now)
app.post("/api/chat", async (req, res) => {
  const { question } = req.body;

  // Basic AI-like response (placeholder)
  const answer = `Thanks for your question! While this assistant gives general suggestions, 
please consult a healthcare professional for medical advice.`;

  return res.json({ answer });
});

// Start server
app.listen(PORT, "0.0.0.0", () => 
  console.log(`✅ Server running on port ${PORT}`)
);
