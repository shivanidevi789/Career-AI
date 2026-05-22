import { useEffect, useState } from "react";

function Roadmap() {
  const [result, setResult] = useState(null);
  const [aiTips, setAiTips] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("result"));
    setResult(saved);

    if (saved?.goal) {
      fetchAITips(saved.goal);
    }
  }, []);
  const fetchAITips = async (career) => {
    try {
      setLoadingAI(true);

      const res = await fetch("http://localhost:5000/api/ai/career-tips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          career,
        }),
      });

      const data = await res.json();

      setAiTips(data.reply);
    } catch (error) {
      console.log(error);
    }

    setLoadingAI(false);
  };
  // No Result
  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black transition">
        <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl font-bold text-red-500 mb-2">
            No Result Found ❌
          </h1>

          <p className="text-gray-600 dark:text-gray-400">
            Please complete the quiz first.
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // ROADMAP DATA
  // =========================

  const roadmapData = {
    "Artificial Intelligence Specialist 🌟": {
      skills: [
        "Python",
        "Machine Learning",
        "Deep Learning",
        "TensorFlow",
        "Problem Solving",
      ],

      steps: [
        "Learn Python programming",
        "Understand Machine Learning basics",
        "Build small AI projects",
        "Learn TensorFlow or PyTorch",
        "Create an AI portfolio",
      ],

      salary: "₹8 LPA - ₹40 LPA",

      courses: ["Python", "Machine Learning", "Deep Learning", "Data Science"],
    },

    "Software Developer 💻": {
      skills: ["HTML", "CSS", "JavaScript", "React", "Node.js"],

      steps: [
        "Learn frontend development",
        "Build responsive websites",
        "Learn backend development",
        "Create full stack projects",
        "Practice coding daily",
      ],

      salary: "₹5 LPA - ₹30 LPA",

      courses: ["Web Development", "React", "Node.js", "MongoDB"],
    },

    "Frontend Developer 🌐": {
      skills: ["React", "Tailwind CSS", "JavaScript", "UI Design"],

      steps: [
        "Learn HTML CSS JavaScript",
        "Master React.js",
        "Build modern UI projects",
        "Learn API integration",
        "Create portfolio websites",
      ],

      salary: "₹4 LPA - ₹25 LPA",

      courses: ["Frontend Development", "React", "Tailwind CSS"],
    },

    "Game Developer 🎮": {
      skills: ["Unity", "C#", "Game Physics", "Animation"],

      steps: [
        "Learn Unity basics",
        "Create simple games",
        "Understand game mechanics",
        "Build advanced projects",
        "Publish games online",
      ],

      salary: "₹6 LPA - ₹25 LPA",

      courses: ["Unity", "C# Programming", "Game Design"],
    },

    "Cyber Security Analyst 🔐": {
      skills: ["Networking", "Ethical Hacking", "Linux", "Cyber Security"],

      steps: [
        "Learn computer networking",
        "Understand security basics",
        "Practice ethical hacking",
        "Get certifications",
        "Work on security labs",
      ],

      salary: "₹6 LPA - ₹35 LPA",

      courses: ["Cyber Security", "Ethical Hacking", "Networking"],
    },

    "Financial Analyst 💰": {
      skills: ["Finance", "Excel", "Market Analysis", "Communication"],

      steps: [
        "Learn financial basics",
        "Understand stock markets",
        "Practice data analysis",
        "Build finance knowledge",
        "Learn investment strategies",
      ],

      salary: "₹5 LPA - ₹20 LPA",

      courses: ["Finance", "Investment Analysis", "Business Analytics"],
    },

    "Professional Photographer 📸": {
      skills: ["Camera Handling", "Photo Editing", "Creativity", "Lighting"],

      steps: [
        "Learn photography basics",
        "Practice camera techniques",
        "Master photo editing",
        "Build social media portfolio",
        "Work with clients",
      ],

      salary: "₹3 LPA - ₹15 LPA",

      courses: ["Photography", "Photo Editing", "Visual Storytelling"],
    },

    "Content Writer ✍️": {
      skills: ["Writing", "SEO", "Research", "Communication"],

      steps: [
        "Improve writing skills",
        "Learn SEO basics",
        "Start blogging",
        "Write consistently",
        "Build writing portfolio",
      ],

      salary: "₹3 LPA - ₹18 LPA",

      courses: ["Content Writing", "SEO", "Copywriting"],
    },

    "Fitness Trainer 💪": {
      skills: [
        "Fitness Knowledge",
        "Communication",
        "Workout Planning",
        "Nutrition",
      ],

      steps: [
        "Learn fitness fundamentals",
        "Understand nutrition",
        "Get fitness certifications",
        "Practice coaching",
        "Build client network",
      ],

      salary: "₹3 LPA - ₹12 LPA",

      courses: ["Fitness Training", "Nutrition", "Sports Science"],
    },
  };

  // Default Data
  const roadmap = roadmapData[result.goal] || {
    skills: ["Communication", "Learning", "Consistency"],

    steps: [
      "Learn fundamentals",
      "Build practical projects",
      "Improve your skills",
      "Create a portfolio",
    ],

    salary: "Excellent Career Opportunities",

    courses: ["Online Courses", "Practical Learning"],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-gray-950 dark:via-gray-900 dark:to-black py-10 px-4 transition duration-300 pt-24">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-8 border border-gray-200 dark:border-gray-800">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-blue-700 dark:text-blue-400 mb-3">
            {result.goal}
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            {result.explanation}
          </p>
        </div>

        {/* Skills */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-5">
            Skills Required 🛠️
          </h2>

          <div className="flex flex-wrap gap-3">
            {roadmap.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full font-semibold shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-5">
            Step-by-Step Roadmap 🚀
          </h2>

          <div className="space-y-4">
            {roadmap.steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-2xl hover:shadow-lg transition"
              >
                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Salary */}
        <div className="mb-10">
          <div className="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 p-6 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold text-yellow-700 dark:text-yellow-400 mb-3">
              Expected Salary 💰
            </h2>

            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              {roadmap.salary}
            </p>
          </div>
        </div>

        {/* Courses */}
        <div>
          <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-5">
            Recommended Learning 📚
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {roadmap.courses.map((course, index) => (
              <div
                key={index}
                className="bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 font-semibold text-center p-5 rounded-2xl hover:shadow-lg transition border border-purple-200 dark:border-purple-800"
              >
                {course}
              </div>
            ))}
          </div>
        </div>
        {/* AI Career Tips */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-5">
            AI Career Guidance 🤖
          </h2>

          <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-3xl p-6 shadow-xl">
            {loadingAI ? (
              <p className="text-gray-500 dark:text-gray-300 animate-pulse">
                AI is generating career advice...
              </p>
            ) : (
              <div className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-8">
                {aiTips}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Roadmap;
