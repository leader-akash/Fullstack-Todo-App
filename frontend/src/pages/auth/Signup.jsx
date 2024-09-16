import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {

    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        username: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const res = await axios.post(`http://localhost:4000/api/auth/signup`, data)
            toast.success(res?.data?.message)
            navigate("/");
        }
        catch(err){
            console.log('err', err)
            setError(err?.response?.data?.error)
            toast.error(err?.response?.data?.error)
        }
    }

  return (
    <div className='flex justify-center items-center min-h-screen '>
        <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
            <h2 className='text-2xl font-bold mb-6'>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-left text-sm font-medium text-gray-700 mb-1'>Name</label>
                    <input
                        type="text"
                        placeholder='Enter name'
                        value={data?.name}
                        onChange={(e) => setData((prev) => ({...prev, name:e.target.value}))}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-left text-sm font-medium text-gray-700 mb-1'>Username</label>
                    <input
                        type="text"
                        placeholder='Enter username'
                        value={data?.username}
                        onChange={(e) => setData((prev) => ({...prev, username:e.target.value}))}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-left text-sm font-medium text-gray-700 mb-1'>Password</label>
                    <input
                        type="password"
                        placeholder='Enter password'
                        value={data?.password}
                        onChange={(e) => setData((prev) => ({...prev, password:e.target.value}))}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
                <div className='mb-6'>
                    <label className='block text-left text-sm font-medium text-gray-700 mb-1'>Confirm Password</label>
                    <input
                        type="password"
                        placeholder='Enter confirm password'
                        value={data?.confirmPassword}
                        onChange={(e) => setData((prev) => ({...prev, confirmPassword:e.target.value}))}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                {
                    error && 
                    <p className='text-red-500 mb-6'>{error}</p>
                }

                <button
                    type="submit"
                    className='w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                >
                    Submit
                </button>

                <Link to="/login" className='block mt-4 text-blue-500'>Already Signup? Login</Link>
            </form>
        </div>
    </div>
  )
}

export default Signup
