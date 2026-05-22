import { useEffect, useState } from "react";

function History() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/history", {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setResults(data);
        } else {
          setResults([]);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black pt-24 px-4 sm:px-6 py-10 overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        {/* HEADING */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-blue-600 dark:text-blue-400">
          Previous Results 📜
        </h1>

        {/* LOADING */}
        {loading && (
          <div className="text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300 animate-pulse">
              Loading History...
            </p>
          </div>
        )}

        {/* EMPTY */}
        {!loading && results.length === 0 && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-800 text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              No History Found ❌
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-3">
              Complete a career test to see your previous results.
            </p>
          </div>
        )}

        {/* RESULTS */}
        <div className="space-y-5">
          {results.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 p-5 sm:p-6 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 break-words"
            >
              {/* GOAL */}
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                {item.goal}
              </h2>

              {/* EXPLANATION */}
              <p className="text-gray-600 dark:text-gray-400 mt-3 leading-7 text-sm sm:text-base">
                {item.explanation}
              </p>

              {/* DATE */}
              <p className="mt-4 text-xs sm:text-sm text-gray-500">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default History;
