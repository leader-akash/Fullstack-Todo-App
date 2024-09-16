import { useState, useEffect } from "react";
import "./App.css";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateTask from "./pages/tasks/CreateTask";
import GetAllTasks from "./pages/tasks/GetAllTasks";

function App() {
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
    <div className={`min-h-screen bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText`}>
      <header className="p-4 bg-white dark:bg-gray-800 shadow-md">
        <button
          className="px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-800"
          onClick={toggleTheme}
        >
          {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        </button>
      </header>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<CreateTask />} />
        <Route path="/allTasks" element={<GetAllTasks />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
