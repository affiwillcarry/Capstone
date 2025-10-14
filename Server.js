import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// Serve static assets (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// Serve HTML pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
