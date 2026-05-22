// ================= IMPORTS =================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ================= ROUTES =================
const questionRoutes = require("./routes/questionRoutes");
const resultRoutes = require("./routes/resultRoutes");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const historyRoutes = require("./routes/historyRoutes");

// ================= MODELS =================
const Question = require("./models/Question");

// ================= APP =================
const app = express();


// ================= MIDDLEWARE =================

// ✅ CORS sabse pehle
app.use(cors());

// ✅ JSON parser
app.use(express.json());


// ================= API ROUTES =================

app.use("/api/auth", authRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/questions", questionRoutes);

app.use("/api/result", resultRoutes);

app.use("/api/chatbot", chatbotRoutes);

app.use("/api/history", historyRoutes);


// ================= TEST ROUTE =================

app.get("/", (req, res) => {
    res.send("API is running ✅");
});


// ================= DUMMY QUESTION ROUTE =================

app.get("/add", async (req, res) => {
    try {
        // delete old questions
        await Question.deleteMany();

        // insert new questions
        await Question.insertMany([

            // 🎨 CREATIVE
            {
                question: "You enjoy designing logos or posters?",
                options: [
                    { text: "Love it", category: "creative" },
                    { text: "Sometimes", category: "creative" },
                    { text: "Rarely", category: "business" },
                    { text: "Never", category: "business" },
                ],
                category: "creative",
            },

            {
                question: "You like drawing or sketching?",
                options: [
                    { text: "Very much", category: "creative" },
                    { text: "Sometimes", category: "creative" },
                    { text: "Not really", category: "business" },
                    { text: "No interest", category: "business" },
                ],
                category: "creative",
            },

            {
                question: "You enjoy making videos or editing?",
                options: [
                    { text: "Yes, love it", category: "creative" },
                    { text: "Sometimes", category: "creative" },
                    { text: "Rarely", category: "business" },
                    { text: "No", category: "business" },
                ],
                category: "creative",
            },

            // 💼 BUSINESS
            {
                question: "You like managing money?",
                options: [
                    { text: "Yes", category: "business" },
                    { text: "Maybe", category: "business" },
                    { text: "Not really", category: "creative" },
                    { text: "No", category: "creative" },
                ],
                category: "business",
            },

            {
                question: "You want to start your own business?",
                options: [
                    { text: "Definitely", category: "business" },
                    { text: "Maybe", category: "business" },
                    { text: "Not sure", category: "creative" },
                    { text: "No", category: "creative" },
                ],
                category: "business",
            },

            {
                question: "You enjoy leadership roles?",
                options: [
                    { text: "Yes", category: "business" },
                    { text: "Sometimes", category: "business" },
                    { text: "Rarely", category: "creative" },
                    { text: "No", category: "creative" },
                ],
                category: "business",
            },

            // 💻 PROGRAMMING
            {
                question: "You enjoy coding problems?",
                options: [
                    { text: "Love solving", category: "programming" },
                    { text: "Sometimes", category: "programming" },
                    { text: "Not really", category: "creative" },
                    { text: "No", category: "creative" },
                ],
                category: "programming",
            },

            {
                question: "You like building apps/websites?",
                options: [
                    { text: "Yes", category: "programming" },
                    { text: "Maybe", category: "programming" },
                    { text: "Rarely", category: "business" },
                    { text: "No", category: "business" },
                ],
                category: "programming",
            },

            {
                question: "You enjoy debugging errors?",
                options: [
                    { text: "Yes", category: "programming" },
                    { text: "Sometimes", category: "programming" },
                    { text: "No", category: "creative" },
                    { text: "Hate it", category: "creative" },
                ],
                category: "programming",
            },

            // 🏏 SPORTS
            {
                question: "You like outdoor games?",
                options: [
                    { text: "Love it", category: "sports" },
                    { text: "Sometimes", category: "sports" },
                    { text: "Rarely", category: "business" },
                    { text: "No", category: "business" },
                ],
                category: "sports",
            },

            {
                question: "You enjoy teamwork?",
                options: [
                    { text: "Yes", category: "sports" },
                    { text: "Sometimes", category: "sports" },
                    { text: "Not much", category: "creative" },
                    { text: "No", category: "creative" },
                ],
                category: "sports",
            },

            {
                question: "You like physical activity daily?",
                options: [
                    { text: "Yes", category: "sports" },
                    { text: "Sometimes", category: "sports" },
                    { text: "Rarely", category: "business" },
                    { text: "No", category: "business" },
                ],
                category: "sports",
            },

        ]);

        res.send("🔥 Questions Added Successfully!");
    } catch (error) {
        console.log(error);

        res.status(500).send("Error adding questions");
    }
});


// ================= DATABASE =================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected ✅");
    })
    .catch((err) => {
        console.log(err);
    });


// ================= SERVER =================

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});