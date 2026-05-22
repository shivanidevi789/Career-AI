import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Interest from "./pages/Interest";
import Questions from "./pages/Questions";
import Result from "./pages/Result";
import Roadmap from "./pages/Roadmap";
import Chatbot from "./pages/Chatbot";
import History from "./pages/History";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/interest" element={<Interest />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/result" element={<Result />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
