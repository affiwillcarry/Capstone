import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "views", "index.html")));
app.get("/book", (req, res) => res.sendFile(path.join(__dirname, "views", "book.html")));
app.get("/confirmation", (req, res) => res.sendFile(path.join(__dirname, "views", "confirmation.html")));

// Start
app.listen(PORT, "0.0.0.0", () => console.log(`✅ Server running on port ${PORT}`));
