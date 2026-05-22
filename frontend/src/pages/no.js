import React, { useEffect, useState } from "react";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState([]);
  const [scores, setScores] = useState({});
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const allAnswered = questions.every((q) => answers[q._id]);

  const progress = questions.length
    ? Math.round((Object.keys(answers).length / questions.length) * 100)
    : 0;
  <p className="text-sm text-gray-600 mb-2">Progress: {progress}%</p>;
  useEffect(() => {
    setLoading(true);

    fetch("http://localhost:5000/api/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleRestart = () => {
    setAnswers({});
    setResult([]);
    setScores({});
    setExplanation("");
  };

  // handle option select
  const handleChange = (id, option) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: option,
    }));
  };

  const handleSubmit = () => {
    // Better validation
    const allAnswered = questions.every((q) => answers[q._id]);

    if (!allAnswered) {
      alert("Please answer all questions");
      return;
    }

    setLoading(true);

    fetch("http://localhost:5000/api/result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answers }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("API RESPONSE 👉", data);
        setResult(data.goals || []);
        setScores(data.scores || {});
        setExplanation(data.explanation || "");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Questions</h1>

      <div className="w-full bg-gray-200 rounded h-3 mb-4">
        <div
          className="bg-blue-500 h-3 rounded"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Loading */}
      {loading && result.length === 0 && (
        <p className="text-blue-500 font-semibold">Loading...</p>
      )}

      {/* Questions */}
      {result.length === 0 &&
        !loading &&
        questions.map((q, index) => (
          <div key={q._id} className="mb-4 p-4 border rounded">
            <p className="text-sm text-gray-500">
              Question {index + 1} of {questions.length}
            </p>

            <p className="font-semibold">{q.question}</p>

            {q.options.map((opt, i) => (
              <div key={i}>
                <input
                  type="radio"
                  name={`q_${q._id}`}
                  checked={answers[q._id] === opt}
                  onChange={() => handleChange(q._id, opt)}
                />

                <label
                  className={`ml-2 ${
                    answers[q._id] === opt ? "text-blue-600 font-bold" : ""
                  }`}
                >
                  {opt}
                </label>
              </div>
            ))}
          </div>
        ))}

      {/* Result */}
      {result.length > 0 && (
        <div className="mt-6 p-6 rounded-lg bg-green-100 shadow">
          {/* 🔥 NEW UI */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-700 mb-2">
              🎯 Your Career Match
            </h2>

            {result.map((g, i) => (
              <p key={i} className="text-lg font-semibold">
                {g}
              </p>
            ))}

            <p className="mt-3 text-gray-700">{explanation}</p>
          </div>

          {/* Scores (optional) */}
          <h3 className="mt-4 font-semibold">Scores:</h3>
          {Object.entries(scores).map(([cat, val]) => (
            <p key={cat}>
              {cat}: {val}
            </p>
          ))}
          <button onClick={handleRestart}>Restart</button>
          <button
            onClick={handleRestart}
            className="bg-gray-500 text-white px-3 py-2 mt-3 rounded"
          >
            Restart
          </button>
        </div>
      )}
      {/* Submit */}
      {result.length === 0 && !loading && (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className={`px-4 py-2 mt-4 rounded ${
            allAnswered ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          Submit
        </button>
      )}
    </div>
  );
}

export default Questions;
