import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios"; // ✅ Added for EmailJS API calls

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

// Handle form submission + send email via EmailJS
app.post("/book", async (req, res) => {
  const { name, email, clinic, date, reason } = req.body;

  console.log("New appointment booked:");
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Clinic: ${clinic}`);
  console.log(`Date: ${date}`);
  console.log(`Reason: ${reason}`);

  try {
    // ✅ Send email using EmailJS REST API (server-side)
    await axios.post("https://api.emailjs.com/api/v1.0/email/send", {
      service_id: "service_p2nx89g",
      template_id: "template_illv0yi",
      user_id: "hHuE0c56crs3AyYQg", // Public Key
      accessToken: "DvIlDKUtEWQY2UFoGO9Bo", // ✅ Your Private Key
      template_params: {
        name,
        email,
        clinic,
        date,
        reason,
      },
    });

    console.log("✅ Email sent successfully via EmailJS.");
    res.sendFile(path.join(__dirname, "views", "confirmation.html"));
  } catch (error) {
    console.error("❌ Failed to send EmailJS message:", error.message);
    res.status(500).send("Error sending confirmation email.");
  }
});

// Start server
app.listen(port, () => console.log(`✅ Server running on port ${port}`));
