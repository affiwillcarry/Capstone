import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import sgMail from "@sendgrid/mail";

// Setup file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize app
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set your SendGrid API key from environment variables
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/book", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "book.html"));
});

app.post("/book", async (req, res) => {
  const { name, email, clinic, date, reason } = req.body;

  try {
    // Confirmation email to the user
    await sgMail.send({
      to: email,
      from: "mohammedarfat663@gmail.com", // must be a verified sender in SendGrid
      subject: "Appointment Confirmation",
      text: `Hi ${name}, your appointment at ${clinic} is confirmed for ${date}.`,
    });

    // Notification email to clinic admin
    await sgMail.send({
      to: "mohammedarfat663@gmail.com",
      from: "mohammedarfat663@gmail.com",
      subject: "New Appointment Booking",
      text: `${name} booked an appointment at ${clinic} on ${date}. Reason: ${reason}`,
    });

    res.sendFile(path.join(__dirname, "views", "confirmation.html"));
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to send email");
  }
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
});
