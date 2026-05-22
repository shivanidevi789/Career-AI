const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    goal: {
        type: String,
        required: true,
    },

    explanation: {
        type: String,
        required: true,
    },

    percentages: [{
        category: String,
        percentage: Number,
    },],
}, {
    timestamps: true,
});

module.exports = mongoose.model("Result", resultSchema);