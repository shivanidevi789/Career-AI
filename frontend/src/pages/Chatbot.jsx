import { useState } from "react";

function Chatbot() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;

    const userMessage = {
      type: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
        }),
      });

      const data = await res.json();

      const aiMessage = {
        type: "ai",
        text: data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);

      setQuestion("");
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-950 dark:to-gray-900 transition px-4 py-8 pt-24">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-6 border border-gray-200 dark:border-gray-800">
        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-blue-700 dark:text-blue-400">
            Career AI Chatbot
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Ask anything about careers, skills, roadmap & future
          </p>
        </div>

        {/* CHAT AREA */}
        <div className="h-[500px] overflow-y-auto rounded-3xl p-5 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-6xl mb-4">🤖</div>

              <h2 className="text-2xl font-bold text-gray-700 dark:text-white">
                Welcome to Career AI
              </h2>

              <p className="text-gray-500 dark:text-gray-400 mt-3">Example:</p>

              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() =>
                    setQuestion("Can I become AI Engineer after BCA?")
                  }
                  className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-xl text-sm hover:scale-105 transition"
                >
                  AI Engineer after BCA?
                </button>

                <button
                  onClick={() =>
                    setQuestion("Best skills for web development?")
                  }
                  className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-4 py-2 rounded-xl text-sm hover:scale-105 transition"
                >
                  Web Dev Skills
                </button>

                <button
                  onClick={() => setQuestion("How to become a Data Scientist?")}
                  className="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-xl text-sm hover:scale-105 transition"
                >
                  Data Scientist Roadmap
                </button>
              </div>
            </div>
          )}

          {/* MESSAGES */}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-5 flex ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] px-5 py-4 rounded-3xl shadow-lg text-sm md:text-base leading-7 transition ${
                  msg.type === "user"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* LOADING */}
          {loading && (
            <div className="flex items-center gap-3 mt-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>

              <p className="text-gray-500 dark:text-gray-400 ml-2">
                AI is thinking...
              </p>
            </div>
          )}
        </div>

        {/* INPUT AREA */}
        <div className="flex gap-3 mt-6">
          <input
            type="text"
            placeholder="Ask your career question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                askAI();
              }
            }}
            className="flex-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <button
            onClick={askAI}
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 disabled:opacity-50 text-white px-7 rounded-2xl font-bold shadow-lg transition"
          >
            Ask AI
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
