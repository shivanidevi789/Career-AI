function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-gray-950 dark:via-gray-900 dark:to-black py-10 px-5 transition duration-300 pt-24">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-8 border border-gray-200 dark:border-gray-800 transition">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-400 mb-6 text-center">
          About Career AI
        </h1>

        {/* Intro */}
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-8 mb-6">
          Career AI is an intelligent career guidance platform that helps
          students discover the best career path based on their interests,
          personality, and skills.
        </p>

        <p className="text-gray-700 dark:text-gray-300 text-lg leading-8 mb-6">
          The system uses AI-generated aptitude questions and smart analysis to
          recommend suitable career fields such as Programming, Business,
          Creative Arts, Sports, and many more.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-5 mt-8">
          {/* Features */}
          <div className="bg-blue-50 dark:bg-gray-800 p-5 rounded-2xl shadow border border-blue-100 dark:border-gray-700 transition hover:scale-[1.02]">
            <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-3">
              🎯 Features
            </h2>

            <ul className="text-gray-700 dark:text-gray-300 space-y-2">
              <li>✔ AI Career Prediction</li>
              <li>✔ Interest Based Questions</li>
              <li>✔ Career Roadmaps</li>
              <li>✔ Login & Authentication</li>
              <li>✔ Modern UI Design</li>
              <li>✔ Dark Mode Support</li>
            </ul>
          </div>

          {/* Technologies */}
          <div className="bg-indigo-50 dark:bg-gray-800 p-5 rounded-2xl shadow border border-indigo-100 dark:border-gray-700 transition hover:scale-[1.02]">
            <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-3">
              💡 Technologies
            </h2>

            <ul className="text-gray-700 dark:text-gray-300 space-y-2">
              <li>✔ React JS</li>
              <li>✔ Tailwind CSS</li>
              <li>✔ Node JS</li>
              <li>✔ Express JS</li>
              <li>✔ MongoDB</li>
              <li>✔ OpenRouter AI API</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center mt-10 border-t border-gray-200 dark:border-gray-700 pt-6">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Built with ❤️ using MERN Stack & AI
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
