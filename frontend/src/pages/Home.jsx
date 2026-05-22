import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  // check login
  const user = JSON.parse(localStorage.getItem("user"));

  const handleStart = () => {
    if (user) {
      navigate("/interest");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-black dark:to-gray-950 flex items-center justify-center px-4 transition duration-300 pt-24">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-10 text-center border border-gray-200 dark:border-gray-800 transition duration-300">
        {/* Heading */}
        <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white leading-tight">
          Find Your Perfect Career 🎯
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-6 text-lg leading-8">
          Discover the best career path based on your interests, personality,
          and skills with our AI-powered career guidance system.
        </p>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4 mt-10">
          {/* CARD 1 */}
          <div className="bg-blue-50 dark:bg-gray-800 p-5 rounded-2xl border border-blue-100 dark:border-gray-700 hover:scale-105 transition">
            <h3 className="font-bold text-blue-700 dark:text-blue-400 text-lg">
              Smart Questions
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
              AI-generated aptitude and personality questions.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-green-50 dark:bg-gray-800 p-5 rounded-2xl border border-green-100 dark:border-gray-700 hover:scale-105 transition">
            <h3 className="font-bold text-green-700 dark:text-green-400 text-lg">
              Career Prediction
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
              Get personalized career recommendations instantly.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-purple-50 dark:bg-gray-800 p-5 rounded-2xl border border-purple-100 dark:border-gray-700 hover:scale-105 transition">
            <h3 className="font-bold text-purple-700 dark:text-purple-400 text-lg">
              Roadmap Guide
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
              Learn skills, salary, and growth roadmap.
            </p>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleStart}
          className="mt-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition duration-300 text-white px-10 py-4 rounded-2xl text-lg font-bold shadow-lg"
        >
          {user ? "Start Career Test " : "Login To Continue "}
        </button>

        {/* Extra */}
        {!user && (
          <p className="mt-5 text-gray-500 dark:text-gray-400">
            Create an account to save your career journey.
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
