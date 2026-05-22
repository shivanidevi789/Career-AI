const express = require("express");
const router = express.Router();

const Result = require("../models/Result");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const { answers } = req.body;

    // =========================
    // VALIDATION
    // =========================

    if (!answers) {
      return res.status(400).json({
        message: "Answers are required",
      });
    }

    let scores = {};

    // =========================
    // COUNT CATEGORY SCORES
    // =========================

    Object.values(answers).forEach((ans) => {
      const category = ans.category;

      if (!scores[category]) {
        scores[category] = 0;
      }

      scores[category]++;
    });

    // =========================
    // FIND BEST CATEGORY
    // =========================

    let bestCategory = "";
    let max = 0;

    for (let cat in scores) {
      if (scores[cat] > max) {
        max = scores[cat];
        bestCategory = cat;
      }
    }

    // =========================
    // CAREER MAP
    // IMPORTANT:
    // category names MUST match
    // question category names
    // =========================

    const careerMap = {
      programming: {
        goal: "Software Developer 💻",
        explanation: "You enjoy coding, logic, and building digital solutions.",

        skills: [
          "JavaScript",
          "React",
          "Node.js",
          "Problem Solving",
        ],
      },

      creative: {
        goal: "Graphic Designer 🎨",
        explanation: "You enjoy artistic creativity and visual communication.",

        skills: [
          "Photoshop",
          "Illustrator",
          "Creativity",
          "UI Design",
        ],
      },

      business: {
        goal: "Business Manager 📈",
        explanation: "You have leadership qualities and management skills.",

        skills: [
          "Leadership",
          "Communication",
          "Management",
          "Strategy",
        ],
      },

      sports: {
        goal: "Fitness Trainer 💪",
        explanation: "You are passionate about physical activity and teamwork.",

        skills: [
          "Fitness",
          "Discipline",
          "Training",
          "Communication",
        ],
      },

      ai: {
        goal: "AI Engineer 🤖",
        explanation: "You are interested in intelligent systems and future technologies.",

        skills: [
          "Python",
          "Machine Learning",
          "Deep Learning",
          "TensorFlow",
        ],
      },

      gaming: {
        goal: "Game Developer 🎮",
        explanation: "You enjoy gaming and creative problem solving.",

        skills: [
          "Unity",
          "C#",
          "Game Design",
          "Creativity",
        ],
      },
    };

    // =========================
    // BASE RESULT
    // =========================

    const baseResult = careerMap[bestCategory] || {
      goal: `${bestCategory} Specialist 🌟`,

      explanation: `You show strong interest in ${bestCategory}.`,

      skills: ["Communication", "Learning", "Consistency"],
    };

    // =========================
    // PERCENTAGES
    // =========================

    const totalAnswers = Object.values(scores).reduce(
      (acc, curr) => acc + curr,
      0
    );

    const percentages = Object.entries(scores)
      .map(([category, score]) => ({
        category,
        percentage: Math.round((score / totalAnswers) * 100),
      }))
      .sort((a, b) => b.percentage - a.percentage);

    // =========================
    // FINAL RESULT
    // =========================

    const result = {
      ...baseResult,
      percentages,
    };

    // =========================
    // SAVE HISTORY
    // =========================

    const token = req.headers.authorization;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        await Result.create({
          userId: decoded.id,
          goal: result.goal,
          explanation: result.explanation,
          percentages: result.percentages,
        });
        console.log("TOKEN 👉", token);
        console.log("Result Saved ✅");
      } catch (error) {
        console.log("JWT ERROR 👉", error.message);
      }
    } else {
      console.log("NO TOKEN FOUND ❌");
    }

    // =========================
    // SEND RESPONSE
    // =========================

    res.json(result);

  } catch (error) {
    console.log("SERVER ERROR 👉", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;