import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { InputField } from '../../components/input/InputField';

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`https://classsy-todo-backend.vercel.app/api/auth/login`, data);
            localStorage.setItem('jwtToken', res.data.token);
            console.log('res', res)
            toast.success(res?.data?.message);
            navigate('/');
        } catch (err) {
            console.log('Login error:', err);
            setError(err?.response?.data?.error || 'An error occurred');
            toast.error(err?.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen dark:bg-gray-900 dark:text-white">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
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
                    {error && <p className="text-red-500 dark:text-red-400 mb-6">{error}</p>}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Submit
                    </button>
                    <Link to="/signup" className="block mt-4 text-blue-500 dark:text-blue-400">
                        Don't have an account? Signup
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
