import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 dark:from-gray-950 dark:via-gray-900 dark:to-black px-4 transition duration-300 pt-24">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-8 w-full max-w-md border border-gray-200 dark:border-gray-800 transition"
      >
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-2 text-green-600 dark:text-green-400">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
          Login to continue your career journey
        </p>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          autoComplete="email"
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-3 rounded-xl mb-4 outline-none focus:ring-2 focus:ring-green-400 transition"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
          autoComplete="current-password"
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-3 rounded-xl mb-5 outline-none focus:ring-2 focus:ring-green-400 transition"
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 hover:scale-[1.02] text-white py-3 rounded-xl font-bold transition duration-300 shadow-lg"
        >
          Login
        </button>

        {/* Register Link */}
        <p className="text-center mt-5 text-gray-600 dark:text-gray-400">
          Don't have an account?
          <Link
            to="/register"
            className="text-green-600 dark:text-green-400 font-semibold ml-2 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
