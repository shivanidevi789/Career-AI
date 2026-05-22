const express = require("express");
const router = express.Router();

const Result = require("../models/Result");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                message: "No token",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const history = await Result.find({
            userId: decoded.id,
        }).sort({ createdAt: -1 });

        res.json(history);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
});

module.exports = router;