import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function Result() {
  const navigate = useNavigate();

  const stored = localStorage.getItem("result");
  const data = stored ? JSON.parse(stored) : null;

  // Chart Colors
  const COLORS = [
    "#3B82F6",
    "#8B5CF6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#06B6D4",
  ];

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4 transition">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl text-center max-w-md w-full border border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold text-red-500">
            No Result Found ❌
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mt-3">
            Please complete the quiz first.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl transition font-semibold"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Dynamic Gradient Colors
  const colorMap = {
    technology: "from-blue-500 to-indigo-600",
    programming: "from-blue-500 to-indigo-700",
    business: "from-green-500 to-emerald-600",
    creative: "from-pink-500 to-purple-600",
    sports: "from-orange-500 to-red-500",
    music: "from-violet-500 to-fuchsia-600",
    gaming: "from-gray-700 to-black",
    ai: "from-cyan-500 to-blue-700",
  };

  const gradient =
    colorMap[data.category?.toLowerCase()] || "from-purple-500 to-indigo-600";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 dark:from-gray-950 dark:via-gray-900 dark:to-black flex items-center justify-center px-4 py-10 transition pt-24">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
        {/* TOP SECTION */}
        <div
          className={`bg-gradient-to-r ${gradient} text-white p-8 text-center relative overflow-hidden`}
        >
          {/* Glow */}
          <div className="absolute w-72 h-72 bg-white/10 rounded-full -top-20 -right-20 blur-3xl"></div>

          <p className="uppercase tracking-[4px] text-sm opacity-90 relative z-10">
            Career Prediction
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-4 relative z-10">
            {data.goal}
          </h1>

          <p className="mt-5 text-lg opacity-95 leading-8 relative z-10">
            {data.explanation}
          </p>
        </div>

        {/* CONTENT */}
        <div className="p-8">
          {/* WHY SECTION */}
          <div className="bg-gray-50 dark:bg-gray-800/60 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Why This Career Fits You 💡
            </h3>

            <p className="text-gray-600 dark:text-gray-300 leading-8 text-[15px]">
              Your answers show strong interest and personality traits related
              to this field. Based on your choices, this career matches your
              creativity, mindset, strengths, and future growth potential.
            </p>
          </div>

          {/* SKILLS */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-5">
              Skills You Should Focus On 🚀
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {data.skills?.map((skill, index) => (
                <div
                  key={index}
                  className="bg-blue-50 dark:bg-gray-800 border border-blue-100 dark:border-gray-700 text-blue-700 dark:text-blue-300 px-4 py-4 rounded-2xl font-semibold text-center hover:scale-105 transition duration-300 shadow-sm hover:shadow-lg"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* CAREER MATCH ANALYSIS */}
          {data.percentages && (
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-5 text-blue-600 dark:text-blue-400">
                Career Match Analysis 📊
              </h2>

              <div className="space-y-5">
                {data.percentages.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex justify-between mb-3">
                      <span className="font-semibold text-gray-700 dark:text-gray-200">
                        {item.category}
                      </span>

                      <span className="font-bold text-blue-600 dark:text-blue-400">
                        {item.percentage}%
                      </span>
                    </div>

                    <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-700"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CHART SECTION */}
          {data.percentages && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-center mb-6 text-purple-600 dark:text-purple-400">
                Career Insights 📈
              </h2>

              <div className="h-[350px] bg-gray-50 dark:bg-gray-800 rounded-3xl shadow-xl p-5 border border-gray-200 dark:border-gray-700">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.percentages}
                      dataKey="percentage"
                      nameKey="category"
                      outerRadius={120}
                      label
                    >
                      {data.percentages.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* STATS SECTION */}
          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 text-center">
              <h4 className="text-sm text-gray-500 dark:text-gray-400">
                Career Match
              </h4>

              <p className="text-3xl font-bold text-green-500 mt-2">
                {data.percentages?.[0]?.percentage || 95}%
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 text-center">
              <h4 className="text-sm text-gray-500 dark:text-gray-400">
                Future Growth
              </h4>

              <p className="text-3xl font-bold text-blue-500 mt-2">High</p>
            </div>
          </div>

          {/* ROADMAP BUTTON */}
          <button
            onClick={() => navigate("/roadmap")}
            className={`mt-8 w-full bg-gradient-to-r ${gradient} hover:scale-[1.02] text-white font-bold py-4 rounded-2xl transition duration-300 shadow-xl text-lg`}
          >
            How To Achieve This Goal
          </button>

          {/* START AGAIN */}
          <button
            onClick={() => navigate("/")}
            className="mt-4 w-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold py-3 rounded-2xl transition"
          >
            Start Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;
