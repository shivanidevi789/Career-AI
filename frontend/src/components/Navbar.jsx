import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaUserGraduate,
  FaHome,
  FaInfoCircle,
  FaClipboardList,
  FaRobot,
  FaHistory,
  FaSignOutAlt,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  // user data
  const user = JSON.parse(localStorage.getItem("user"));

  // dark mode
  const [darkMode, setDarkMode] = useState(false);

  // mobile menu
  const [menuOpen, setMenuOpen] = useState(false);

  // load theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // toggle dark mode
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    setDarkMode(!darkMode);
  };

  // logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-gray-900 dark:to-black shadow-lg px-6 py-4 transition duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3 text-2xl font-bold text-white tracking-wide"
        >
          <FaUserGraduate className="text-blue-100 text-3xl" />
          Career AI
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* DARK MODE */}
          <button
            onClick={toggleDarkMode}
            className="bg-white dark:bg-gray-800 dark:text-white text-black px-4 py-2 rounded-xl font-semibold hover:scale-105 transition"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-2xl"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* DROPDOWN MENU */}
      {menuOpen && (
        <div className="absolute top-20 right-6 w-64 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in slide-in-from-top duration-300">
          {/* HOME */}
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 px-6 py-4 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-white font-medium transition"
          >
            <FaHome />
            Home
          </Link>

          {/* ABOUT */}
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 px-6 py-4 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-white font-medium transition"
          >
            <FaInfoCircle />
            About
          </Link>

          {/* USER LINKS */}
          {user && (
            <>
              <Link
                to="/interest"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-6 py-4 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-white font-medium transition"
              >
                <FaClipboardList />
                Career Quiz
              </Link>

              <Link
                to="/chatbot"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-6 py-4 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-white font-medium transition"
              >
                <FaRobot />
                AI Chat
              </Link>
              <Link
                to="/history"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-6 py-4 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-white font-medium transition"
              >
                <FaHistory />
                History
              </Link>

              <div className="px-6 py-4 text-blue-600 dark:text-blue-400 font-semibold border-t border-gray-200 dark:border-gray-700">
                Hi, {user.name}
              </div>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 text-left px-6 py-4 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 font-semibold transition"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
