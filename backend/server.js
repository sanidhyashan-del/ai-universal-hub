const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// ChatGPT route
app.post("/api/chatgpt", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );
    res.json({ output: response.data.choices[0].message.content });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "ChatGPT service unavailable" });
  }
});

// Claude route
app.post("/api/claude", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        model: "claude-3-opus-20240229",
        messages: [{ role: "user", content: prompt }],
      },
      { headers: { Authorization: `Bearer ${process.env.CLAUDE_API_KEY}` } }
    );
    res.json({ output: response.data.output });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Claude service unavailable" });
  }
});

// Gemini route (example placeholder)
app.post("/api/gemini", async (req, res) => {
  res.json({ output: "Gemini integration coming soon." });
});

// Perplexity route (example placeholder)
app.post("/api/perplexity", async (req, res) => {
  res.json({ output: "Perplexity integration coming soon." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
