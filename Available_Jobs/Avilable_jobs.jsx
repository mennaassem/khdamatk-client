import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaCode,
  FaPalette,
  FaVideo,
  FaLanguage,
  FaPen,
  FaBullhorn,
  FaChartLine,
  FaShoppingCart,
  FaGraduationCap,
  FaDollarSign,
  FaBriefcase,
  FaWrench,
  FaMoon,
  FaSun,
} from "react-icons/fa";

function AvailableJobs() {
  const [activeCategory, setActiveCategory] = useState("Developers");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const categories = [
    { name: "Developers", icon: FaCode },
    { name: "Designers", icon: FaPalette },
    { name: "Media Production", icon: FaVideo },
    { name: "Translators", icon: FaLanguage },
    { name: "Writing", icon: FaPen },
    { name: "Digital Marketing", icon: FaBullhorn },
    { name: "Marketing", icon: FaChartLine },
    { name: "Sales", icon: FaShoppingCart },
    { name: "Training", icon: FaGraduationCap },
    { name: "Finance", icon: FaDollarSign },
    { name: "Business", icon: FaBriefcase },
    { name: "Engineers", icon: FaWrench },
  ];

  const jobs = [1, 2, 3, 4];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-purple-700 dark:bg-purple-900 text-white flex justify-between items-center px-6 py-4 text-xl font-semibold">
        <span>Available Jobs</span>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-white text-lg"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-white dark:bg-gray-800 dark:text-gray-200 rounded-2xl shadow-md p-5 transition-colors duration-300">
          <h3 className="font-semibold text-lg mb-4">Services</h3>
          <ul className="space-y-3 text-sm">
            {categories.map(function (cat, index) {
              const Icon = cat.icon;
              return (
                <li
                  key={index}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition duration-200 ${
                    activeCategory === cat.name
                      ? "bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-white font-medium"
                      : "hover:text-purple-700 dark:hover:text-white hover:bg-purple-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <Icon size={18} />
                  {cat.name}
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-6">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Job Cards */}
          {jobs.map(function (_, index) {
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 dark:text-gray-200 rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between gap-6 transition-colors duration-300"
              >
                <div className="flex-1">
                  <h2 className="text-lg font-semibold mb-3">Title Job</h2>

                  <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 text-sm">
                    <strong className="block mb-1">Details:</strong>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-start md:items-end gap-2 min-w-[160px]">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl transition duration-200">
                    View Job
                  </button>

                  <p className="text-sm">Post At:</p>
                  <p className="font-medium">10 Jan, 2026</p>
                  <p className="font-semibold">10000 - 25000 EGP</p>

                  <span className="bg-yellow-400 text-white text-xs px-3 py-1 rounded-lg">
                    Budget
                  </span>
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </div>
  );
}

export default AvailableJobs;