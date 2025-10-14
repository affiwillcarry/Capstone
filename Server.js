import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Book appointment page
app.get("/book", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "book.html"));
});

// Handle form submission (no database yet)
app.post("/book", (req, res) => {
  const { name, email, clinic, date, reason } = req.body;
  res.send(`
    <h2>✅ Appointment Confirmed</h2>
    <p>Thank you, <strong>${name}</strong>!</p>
    <p>Your appointment at <strong>${clinic}</strong> on <strong>${date}</strong> for <em>${reason}</em> has been received.</p>
    <a href="/">Return to Home</a>
  `);
});

app.listen(port, () => console.log(`✅ Server running on port ${port}`));
