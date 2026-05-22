const express = require("express");
const router = express.Router();
const axios = require("axios");

require("dotenv").config();

router.post("/", async (req, res) => {
    try {
        const { question } = req.body;

        const prompt = `
You are a smart career guidance AI.

Answer career-related questions simply and clearly.

Question:
${question}
`;

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions", {
            model: "openai/gpt-3.5-turbo",

            messages: [{
                role: "user",
                content: prompt,
            },],
        }, {
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
            },
        }
        );

        const reply =
            response.data.choices[0].message.content;

        res.json({
            reply,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "AI failed",
        });
    }
});

module.exports = router;