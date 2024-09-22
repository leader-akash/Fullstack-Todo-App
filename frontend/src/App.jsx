import { useState, useEffect } from "react";
import "./App.css";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateTask from "./pages/tasks/CreateTask";
import GetAllTasks from "./pages/tasks/GetAllTasks";
import Navbar from "./components/header/Navbar";

function App() {
  

  return (
    <div className={`min-h-screen pb-5 bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText`}>
      
    <Navbar />
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
