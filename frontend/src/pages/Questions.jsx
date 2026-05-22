import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Progress
  const progress = questions.length
    ? Math.round((Object.keys(answers).length / questions.length) * 100)
    : 0;

  useEffect(() => {
    const interests = JSON.parse(localStorage.getItem("interests"));

    // Redirect if no interests
    if (!interests || interests.length === 0) {
      navigate("/");
      return;
    }

    fetch("http://localhost:5000/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ interests }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Server Error");
        return res.json();
      })
      .then((data) => {
        console.log("QUESTIONS 👉", data);
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [navigate]);

  // Handle option select
  const handleChange = (questionId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  // Submit
  const handleSubmit = () => {
    const allAnswered = questions.every(
      (q) => answers[q._id]?.text && answers[q._id]?.category
    );

    if (!allAnswered) {
      alert("Please answer all questions ❌");
      return;
    }

    setLoading(true);

    fetch("http://localhost:5000/api/result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ answers }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Server Error");
        return res.json();
      })
      .then((data) => {
        console.log("RESULT 👉", data);

        // SAVE FULL RESULT
        localStorage.setItem("result", JSON.stringify(data));

        navigate("/result");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-gray-950 dark:via-black dark:to-gray-900 flex items-center justify-center px-4 py-10 transition duration-300 pt-24">
      <div className="w-full max-w-4xl bg-white/80 dark:bg-gray-900/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 dark:border-gray-800 p-6 md:p-10">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
            Career Aptitude Test 🎯
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-3">
            Answer all questions honestly
          </p>
        </div>

        {/* Progress */}
        <div className="mb-10">
          <div className="flex justify-between mb-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>

          <div className="w-full bg-gray-200 dark:bg-gray-700 h-4 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-4 rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-16">
            <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

            <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg mt-5 animate-pulse">
              Loading Questions...
            </p>
          </div>
        )}

        {/* Questions */}
        {!loading &&
          questions.map((q, index) => (
            <div
              key={index}
              className="mb-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 shadow-md hover:shadow-2xl transition-all duration-300"
            >
              {/* Question Number */}
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Question {index + 1} of {questions.length}
                </p>

                {answers[q._id] && (
                  <span className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-semibold">
                    Answered ✓
                  </span>
                )}
              </div>

              {/* Question */}
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-5 leading-relaxed">
                {q.question}
              </h2>

              {/* Options */}
              <div className="space-y-4">
                {q.options.map((opt, i) => {
                  const active = answers[q._id]?.text === opt.text;

                  return (
                    <label
                      key={i}
                      className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-300 group ${
                        active
                          ? "bg-gradient-to-r from-blue-600 to-indigo-700 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] scale-[1.02]"
                          : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:shadow-lg hover:-translate-y-1"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question_${index}`}
                        checked={active}
                        onChange={() => handleChange(q._id, opt)}
                        className="accent-blue-600 w-5 h-5"
                      />

                      <span
                        className={`text-sm md:text-base font-medium transition ${
                          active
                            ? "text-white"
                            : "text-gray-700 dark:text-gray-200"
                        }`}
                      >
                        {opt.text}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

        {/* Submit Button */}
        {!loading && questions.length > 0 && (
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:scale-[1.02] transition-all duration-300 text-white font-bold py-5 rounded-2xl shadow-2xl text-lg"
          >
            Submit Answers
          </button>
        )}
      </div>
    </div>
  );
}

export default Questions;
