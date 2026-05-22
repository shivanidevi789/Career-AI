import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCode,
  FaGlobe,
  FaMobileAlt,
  FaRobot,
  FaBrain,
  FaShieldAlt,
  FaCloud,
  FaChartBar,
  FaGamepad,
  FaPaintBrush,
  FaPalette,
  FaFilm,
  FaVideo,
  FaCamera,
  FaMusic,
  FaMicrophone,
  FaPenNib,
  FaYoutube,
  FaPodcast,
  FaBullhorn,
  FaChalkboardTeacher,
  FaChartLine,
  FaSearch,
  FaBriefcase,
  FaRocket,
  FaMoneyBillWave,
  FaChartPie,
  FaUniversity,
  FaFileInvoiceDollar,
  FaTasks,
  FaCrown,
  FaShoppingCart,
  FaFootballBall,
  FaBasketballBall,
  FaDumbbell,
  FaPlane,
  FaUtensils,
  FaTshirt,
  FaHome,
  FaBuilding,
  FaCar,
  FaFlask,
  FaSquareRootAlt,
  FaBalanceScale,
  FaLeaf,
  FaHistory,
  FaChess,
  FaGlassCheers,
  FaNetworkWired,
  FaWifi,
  FaShoppingBag,
  FaHandshake,
  FaLaptopCode,
  FaSatellite,
  FaSeedling,
  FaLandmark,
  FaMicroscope,
  FaMicrochip,
  FaSpa,
  FaAppleAlt,
  FaFutbol,
  FaBaseballBall,
  FaTheaterMasks,
  FaFire,
} from "react-icons/fa";
function Interest() {
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // INTERESTS WITH ICONS
  const interests = [
    { name: "Programming", icon: <FaCode /> },
    { name: "Web Development", icon: <FaGlobe /> },
    { name: "App Development", icon: <FaMobileAlt /> },
    { name: "Artificial Intelligence", icon: <FaRobot /> },
    { name: "Machine Learning", icon: <FaBrain /> },
    { name: "Cyber Security", icon: <FaShieldAlt /> },
    { name: "Cloud Computing", icon: <FaCloud /> },
    { name: "Data Science", icon: <FaChartBar /> },
    { name: "Game Development", icon: <FaGamepad /> },
    { name: "UI/UX Design", icon: <FaPaintBrush /> },

    { name: "Graphic Design", icon: <FaPalette /> },
    { name: "Animation", icon: <FaFilm /> },
    { name: "Video Editing", icon: <FaVideo /> },
    { name: "Photography", icon: <FaCamera /> },
    { name: "Music", icon: <FaMusic /> },
    { name: "Singing", icon: <FaMicrophone /> },
    { name: "Dancing", icon: <FaFire /> },
    { name: "Acting", icon: <FaTheaterMasks /> },
    { name: "Writing", icon: <FaPenNib /> },
    { name: "Content Creation", icon: <FaMobileAlt /> },

    { name: "Blogging", icon: <FaPenNib /> },
    { name: "YouTube", icon: <FaYoutube /> },
    { name: "Podcasting", icon: <FaPodcast /> },
    { name: "Public Speaking", icon: <FaBullhorn /> },
    { name: "Teaching", icon: <FaChalkboardTeacher /> },
    { name: "Digital Marketing", icon: <FaChartLine /> },
    { name: "SEO", icon: <FaSearch /> },
    { name: "Business", icon: <FaBriefcase /> },
    { name: "Entrepreneurship", icon: <FaRocket /> },
    { name: "Finance", icon: <FaMoneyBillWave /> },

    { name: "Stock Market", icon: <FaChartPie /> },
    { name: "Investing", icon: <FaUniversity /> },
    { name: "Accounting", icon: <FaFileInvoiceDollar /> },
    { name: "Management", icon: <FaTasks /> },
    { name: "Leadership", icon: <FaCrown /> },
    { name: "Sales", icon: <FaShoppingCart /> },
    { name: "Sports", icon: <FaFutbol /> },
    { name: "Football", icon: <FaFootballBall /> },
    { name: "Cricket", icon: <FaBaseballBall /> },
    { name: "Basketball", icon: <FaBasketballBall /> },

    { name: "Gym & Fitness", icon: <FaDumbbell /> },
    { name: "Yoga", icon: <FaSpa /> },
    { name: "Nutrition", icon: <FaAppleAlt /> },
    { name: "Traveling", icon: <FaPlane /> },
    { name: "Cooking", icon: <FaUtensils /> },
    { name: "Fashion", icon: <FaTshirt /> },
    { name: "Interior Design", icon: <FaHome /> },
    { name: "Architecture", icon: <FaBuilding /> },
    { name: "Robotics", icon: <FaRobot /> },
    { name: "Electronics", icon: <FaMicrochip /> },

    { name: "Automobiles", icon: <FaCar /> },
    { name: "Science", icon: <FaFlask /> },
    { name: "Mathematics", icon: <FaSquareRootAlt /> },
    { name: "Research", icon: <FaMicroscope /> },
    { name: "Psychology", icon: <FaBrain /> },
    { name: "Law", icon: <FaBalanceScale /> },
    { name: "Politics", icon: <FaLandmark /> },
    { name: "Social Work", icon: <FaHandshake /> },
    { name: "Environment", icon: <FaLeaf /> },
    { name: "Agriculture", icon: <FaSeedling /> },

    { name: "Astronomy", icon: <FaSatellite /> },
    { name: "History", icon: <FaHistory /> },
    { name: "Gaming", icon: <FaGamepad /> },
    { name: "Chess", icon: <FaChess /> },
    { name: "Event Management", icon: <FaGlassCheers /> },
    { name: "Networking", icon: <FaNetworkWired /> },
    { name: "Mobile Technology", icon: <FaWifi /> },
    { name: "E-commerce", icon: <FaShoppingBag /> },
    { name: "Freelancing", icon: <FaLaptopCode /> },
    { name: "Customer Service", icon: <FaHandshake /> },
  ];

  // FILTER SEARCH
  const filteredInterests = interests.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // TOGGLE
  const toggleInterest = (interest) => {
    if (selected.includes(interest)) {
      setSelected(selected.filter((item) => item !== interest));
      return;
    }

    if (selected.length >= 8) {
      alert("Maximum 8 interests allowed ⚠️");
      return;
    }

    setSelected([...selected, interest]);
  };

  // NEXT
  const handleNext = () => {
    if (selected.length < 3) {
      alert("Please select at least 3 interests ❌");
      return;
    }

    localStorage.setItem("interests", JSON.stringify(selected));

    navigate("/questions");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-gray-950 dark:via-black dark:to-gray-900 px-4 py-10 transition duration-300 pt-24">
      <div className="max-w-6xl mx-auto bg-white/80 dark:bg-gray-900/90 backdrop-blur-lg shadow-2xl rounded-3xl p-6 md:p-10 border border-white/20 dark:border-gray-800">
        {/* HEADING */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
            Choose Your Interests
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-3">
            Select at least 3 and maximum 8 interests
          </p>

          <div className="mt-4 inline-block bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-5 py-2 rounded-full font-semibold text-sm shadow">
            Selected: {selected.length} / 8
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="🔍 Search interests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-4 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-white outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-700 transition"
          />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {filteredInterests.map((interest, index) => {
            const active = selected.includes(interest.name);

            return (
              <button
                key={index}
                onClick={() => toggleInterest(interest.name)}
                className={`group relative overflow-hidden rounded-3xl p-5 border transition-all duration-300 transform ${
                  active
                    ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-blue-500 scale-105 shadow-[0_0_25px_rgba(59,130,246,0.6)]"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:-translate-y-2 hover:shadow-2xl"
                }`}
              >
                {/* GLOW EFFECT */}
                {active && (
                  <div className="absolute inset-0 bg-blue-400 opacity-10 blur-2xl"></div>
                )}

                <div className="relative flex flex-col items-center gap-3">
                  <span className="text-3xl group-hover:scale-125 transition duration-300">
                    {interest.icon}
                  </span>

                  <span className="font-semibold text-sm md:text-base text-center">
                    {interest.name}
                  </span>

                  {active && (
                    <span className="absolute top-0 right-0 bg-white text-blue-700 rounded-full text-xs px-2 py-1 font-bold shadow">
                      ✓
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* SELECTED */}
        {selected.length > 0 && (
          <div className="mt-10">
            <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4 text-lg">
              Selected Interests:
            </h3>

            <div className="flex flex-wrap gap-3">
              {selected.map((item, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium shadow-lg"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* BUTTON */}
        <button
          onClick={handleNext}
          disabled={selected.length < 3}
          className={`w-full mt-10 py-4 rounded-2xl text-lg font-bold transition-all duration-300 ${
            selected.length < 3
              ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:scale-[1.02] text-white shadow-2xl"
          }`}
        >
          Continue to Questions →
        </button>
      </div>
    </div>
  );
}

export default Interest;
