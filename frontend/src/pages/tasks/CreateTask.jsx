import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { InputField } from '../../components/input/InputField';
import { SelectField } from '../../components/input/SelectField';
import { TextAreaField } from '../../components/input/TextAreaField';

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

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // not accurate
  // const todayDate = new Date().toISOString().split('T')[0];

  const todayDate = getCurrentDate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      toast.error('Unauthorized: No token found');
      return;
    }

    try {
      const res = await axios.post('http://localhost:4000/addTask', task, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
      toast.success(res?.data?.message);
      setTask({
        title: "",
        description: "",
        date: "",
        timePeriod: "",
        completed: false
      });
    } catch (err) {
      setError(err?.response?.data?.error);
      toast.error(err?.response?.data?.error);
    }
  };

  const timePeriodOptions = [
    { value: 'Week', label: 'Week' },
    { value: 'Month', label: 'Month' },
  ];

  return (
    <div className="max-w-2xl mx-auto mt-5  p-8 bg-gray-100 dark:bg-gray-900 dark:text-white rounded-lg shadow-lg">
      {/* <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">Welcome to Classy Todo</h1> */}
      <h2 className="text-2xl font-semibold text-center text-gray-600 dark:text-gray-300 mb-6">Create Tasks</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        <InputField
          label="Title"
          type="text"
          placeholder="Enter title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />

        <TextAreaField
          label="Description"
          value={task.description}
          placeholder="Enter task description"
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />

        <InputField
          label="Date"
          type="date"
          min={todayDate}
          placeholder="Enter date"
          value={task.date}
          onChange={(e) => setTask({ ...task, date: e.target.value })}
        />

        <SelectField
          label="Time Period"
          value={task.timePeriod}
          onChange={(e) => setTask({ ...task, timePeriod: e.target.value })}
          options={timePeriodOptions}
        />


        {/* <div className="flex items-center space-x-2">
          <input
            id="completed"
            type="checkbox"
            checked={task.completed}
            onChange={(e) => setTask((prev) => ({ ...prev, completed: e.target.checked }))}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <label htmlFor="completed" className="text-gray-700 dark:text-gray-300">Completed</label>
        </div> */}

        {error && <p className='text-red-500 dark:text-red-400 mb-6'>{error}</p>}

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition duration-300"
        >
          Create Task
        </button>

        <button className='w-full py-2 bg-gray-200 dark:bg-gray-700 dark:text-white' onClick={() => navigate("/allTasks")}>See All Tasks</button>
      </form>
    </div>
  );
};

export default CreateTask;
