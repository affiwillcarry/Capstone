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

// Handle form submission
app.post("/book", (req, res) => {
  // Extract form data (optional if you want to log later)
  const { name, email, clinic, date, reason } = req.body;

  console.log("New appointment booked:");
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Clinic: ${clinic}`);
  console.log(`Date: ${date}`);
  console.log(`Reason: ${reason}`);

  // Show styled confirmation page
  res.sendFile(path.join(__dirname, "views", "confirmation.html"));
});

// Start server
app.listen(port, () => console.log(`✅ Server running on port ${port}`));
