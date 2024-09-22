import React, { useEffect, useState } from 'react'

const Navbar = () => {

    // State to track theme
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Effect to apply theme class to the root element (html)
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Save the selected theme in localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle theme handler
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 shadow-md">
        <button
          className="px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-800"
          onClick={toggleTheme}
        >
          {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        </button>
      </div>
  )
}

export default Navbar