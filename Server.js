// Simple Azure Test Web App (Node.js + Express)
import express from "express";

const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send(`
    <h1>🎉 Azure + GitHub Deployment Successful!</h1>
    <p>Your app is live and connected correctly.</p>
    <p>Deployed at: ${new Date().toLocaleString()}</p>
  `);
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
