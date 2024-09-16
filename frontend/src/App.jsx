import { useState } from "react";
import "./App.css";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateTask from "./pages/tasks/CreateTask";
import GetAllTasks from "./pages/tasks/GetAllTasks";

function App() {


  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<CreateTask />} />
        <Route path="/allTasks" element={<GetAllTasks />} />



      </Routes>

      <ToastContainer />

    </div>
  )
}

export default App;
