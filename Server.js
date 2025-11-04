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

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Book appointment page
app.get("/book", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "book.html"));
});

// Handle appointment form submission
app.post("/book", (req, res) => {
  const { name, email, clinic, date, reason } = req.body;

  // Log appointment details to console
  console.log("📅 New appointment booked:");
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Clinic: ${clinic}`);
  console.log(`Date: ${date}`);
  console.log(`Reason: ${reason}`);

  // Serve confirmation page
  res.sendFile(path.join(__dirname, "views", "confirmation.html"));
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
});
