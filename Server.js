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

const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Put your SendGrid API key here or in environment variables
sgMail.setApiKey(process.env.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);

app.post('/book', async (req, res) => {
  const { name, email, clinic, date, reason } = req.body;

  try {
    // Confirmation to patient
    await sgMail.send({
      to: email,
      from: 'mohammedarfat663@gmail.com', // must be verified sender in SendGrid
      subject: 'Appointment Confirmation',
      text: `Hi ${name}, your appointment at ${clinic} is confirmed for ${date}.`,
    });

    // Notification to you (clinic admin)
    await sgMail.send({
      to: 'mohammedarfat663@gmail.com',
      from: 'mohammedarfat663@gmail.com',
      subject: 'New Appointment Booking',
      text: `${name} booked an appointment at ${clinic} on ${date}. Reason: ${reason}`,
    });

    res.send('Appointment confirmed!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to send email');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));


// Start server
app.listen(port, () => console.log(`✅ Server running on port ${port}`));
