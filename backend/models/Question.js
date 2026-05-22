const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question: String,
    options: [{
        text: String,
        category: String
    }]
});

module.exports = mongoose.model("Question", questionSchema);