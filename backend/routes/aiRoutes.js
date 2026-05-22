const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/career-tips", async (req, res) => {
  try {
    const { career } = req.body;

    const prompt = `
Give career guidance for ${career}.

Include:
1. Best skills to learn
2. Best colleges
3. Future salary
4. Daily roadmap
5. Career growth

Keep response simple and beginner friendly.
`;

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
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      reply: response.data.choices[0].message.content,
    });
  } catch (error) {
    console.log(error.response?.data || error.message);

    res.status(500).json({
      message: "AI Error",
    });
  }
});

module.exports = router;
