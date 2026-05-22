const express = require("express");
const router = express.Router();
const axios = require("axios");

require("dotenv").config();

// TEST ROUTE
router.get("/", (req, res) => {
  res.send("Questions route working ✅");
});

// AI QUESTIONS
router.post("/", async (req, res) => {
  try {
    const { interests } = req.body;

    // Validation
    if (!interests || interests.length === 0) {
      return res.status(400).json({
        message: "Please select interests",
      });
    }

    // =========================
    // Dynamic Question Count
    // =========================

    let questionCount = 10;

    if (interests.length >= 5 && interests.length <= 6) {
      questionCount = 12;
    }

    if (interests.length >= 7) {
      questionCount = 15;
    }

    // =========================
    // Random Interests For Options
    // =========================

    const shuffled = [...interests].sort(() => 0.5 - Math.random());

    // minimum 4 interests required for options
    const selectedInterests =
      shuffled.length >= 4
        ? shuffled.slice(0, 4)
        : [...shuffled, "Programming", "Business", "Creative", "Sports"].slice(
            0,
            4
          );

    // =========================
    // AI Prompt
    // =========================

    const prompt = `
Generate ${questionCount} UNIQUE career aptitude questions.

User interests:
${selectedInterests.join(", ")}

IMPORTANT RULES:
- Questions must feel realistic
- Questions must be different from each other
- No repeated ideas
- Each question must have EXACTLY 4 options
- Each option must represent ONE interest
- Categories MUST match interest names exactly
- Return ONLY pure JSON
- No markdown
- No explanation

FORMAT:
[
  {
    "question": "Which activity sounds more exciting?",
    "options": [
      {
        "text": "Building AI software",
        "category": "Artificial Intelligence"
      },
      {
        "text": "Managing a startup",
        "category": "Business"
      },
      {
        "text": "Creating digital art",
        "category": "Graphic Design"
      },
      {
        "text": "Training for football matches",
        "category": "Football"
      }
    ]
  }
]
`;

    // =========================
    // OpenRouter API
    // =========================

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.8,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // =========================
    // RAW AI RESPONSE
    // =========================

    let text = response.data.choices[0].message.content;

    console.log("RAW AI RESPONSE 👉", text);

    // =========================
    // Clean JSON
    // =========================

    text = text.replace(/```json/g, "");
    text = text.replace(/```/g, "");
    text = text.trim();

    // =========================
    // Parse JSON
    // =========================

    let questions = JSON.parse(text);

    // =========================
    // Add Custom IDs
    // =========================

    questions = questions.map((q, index) => ({
      _id: `q_${index + 1}`,
      ...q,
    }));

    // =========================
    // Send Response
    // =========================

    res.json(questions);
  } catch (error) {
    console.log("FULL ERROR 👉", error.response?.data || error);

    res.status(500).json({
      message: "AI failed",
      error: error.response?.data || error.message,
    });
  }
});

module.exports = router;
