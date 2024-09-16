import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateTask = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    date: "",
    timePeriod: "",
    completed: false
  });
  const [error, setError] = useState();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('tasl', task)
      const res = await axios.post(`http://localhost:4000/addTask`, task)
      toast.success(res?.data?.message)
      // navigate("/");
      setTask({
        title: "",
        description: "",
        date: "",
        timePeriod: "",
        completed: false
      })
    }
    catch (err) {
      console.log('err', err)
      setError(err?.response?.data?.error)
      toast.error(err?.response?.data?.error)
    }
  }


  return (
    <div className="max-w-2xl mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Welcome to Classy Todo</h1>
      <h2 className="text-xl font-semibold text-center text-gray-600 mb-6">Create Tasks</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-gray-700 font-medium mb-2">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter title"
            value={task.title}
            onChange={(e) => setTask((prev) => ({ ...prev, title: e.target.value }))}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="text-gray-700 font-medium mb-2">Description</label>
          <textarea
            id="description"
            placeholder="Enter description"
            value={task.description}
            onChange={(e) => setTask((prev) => ({ ...prev, description: e.target.value }))}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="date" className="text-gray-700 font-medium mb-2">Date</label>
          <input
            id="date"
            type="date"
            value={task.date}
            onChange={(e) => setTask((prev) => ({ ...prev, date: e.target.value }))}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="timePeriod" className="text-gray-700 font-medium mb-2">Time Period</label>
          <select
            id="timePeriod"
            value={task.timePeriod}
            onChange={(e) => setTask((prev) => ({ ...prev, timePeriod: e.target.value }))}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select time period</option>
            <option value="Week">Week</option>
            <option value="Month">Month</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            id="completed"
            type="checkbox"
            checked={task.completed}
            onChange={(e) => setTask((prev) => ({ ...prev, completed: e.target.checked }))}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <label htmlFor="completed" className="text-gray-700">Completed</label>
        </div>

        {
          error &&
          <p className='text-red-500 mb-6'>{error}</p>
        }

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition duration-300"
        >
          Create Task
        </button>

        <button className='w-full py-2 bg-gray-200' onClick={() => navigate("/allTasks")}>See All Tasks</button>
      </form>
    </div>
  );
};

export default CreateTask;
