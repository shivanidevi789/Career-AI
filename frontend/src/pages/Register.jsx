import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Something went wrong ❌");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-gray-950 dark:via-gray-900 dark:to-black px-4 transition duration-300 pt-24">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-gray-200 dark:border-gray-800"
      >
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
            Create Account
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-3">
            Start your AI career journey today
          </p>
        </div>

        {/* Name */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Create password"
            autoComplete="current-password"
            onChange={handleChange}
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition duration-300 shadow-lg ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] hover:from-blue-700 hover:to-indigo-700 text-white"
          }`}
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        {/* Bottom */}
        <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-600 dark:text-blue-400 font-semibold ml-2 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
