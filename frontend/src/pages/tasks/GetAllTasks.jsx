import React, { useEffect, useState } from 'react';
import TaskCard from '../../components/cards/TaskCard';
import { toast } from 'react-toastify';
import axios from 'axios';
import { RingLoader } from 'react-spinners'; // Import the loader component

const GetAllTasks = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get('http://localhost:4000/getAllTasks');
            console.log('res', res);
            setData(res?.data?.allTasks || []);
        } catch (err) {
            console.log('err', err);
            toast.error(err?.response?.data?.error || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="w-full p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">All Tasks</h2>
            <div className="flex justify-center items-center min-h-screen">
                {isLoading ? (
                    <RingLoader color="#3498db" size={60} />
                ) : (
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4">
                        {data.map((el) => (
                            <div key={el?._id} className="w-full">
                                <TaskCard task={el} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GetAllTasks;
