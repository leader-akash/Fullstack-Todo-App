import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { InputField } from '../../components/input/InputField';

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  // Form submission logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      setError('Passwords do not match');
      return;
    }
    try {
      const res = await axios.post(`http://localhost:4000/api/auth/signup`, data);
      localStorage.setItem('jwtToken', res.data.token);

      toast.success(res?.data?.message);
      navigate('/');
    } catch (err) {
      console.log('Signup error:', err);
      setError(err?.response?.data?.error || 'An error occurred');
      toast.error(err?.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="flex justify-center py-5 min-h-screen bg-gray-100 dark:bg-gray-800 dark:text-white">
      <div className=" dark:bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Signup</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Name"
            type="text"
            placeholder="Enter name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <InputField
            label="Username"
            type="text"
            placeholder="Enter username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="Enter password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <InputField
            label="Confirm Password"
            type="text"
            placeholder="Enter confirm password"
            value={data.confirmPassword}
            onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
          />
          {error && <p className="text-red-500 dark:text-red-400 mb-6">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
          <Link to="/login" className="block mt-4 text-blue-500 dark:text-blue-400">
            Already Signup? Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
