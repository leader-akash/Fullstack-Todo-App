import React, { useEffect, useState } from 'react';
import TaskCard from '../../components/cards/TaskCard';
import { toast } from 'react-toastify';
import axios from 'axios';
import { RingLoader } from 'react-spinners';
import EditModalDraggable from '../../components/modal/EditModal';
import DeleteModal from '../../components/modal/DeleteModal';

const GetAllTasks = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); 
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); 

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      setIsLoading(true);
      const res = await axios.get('http://localhost:4000/getAllTasks',{
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(res?.data?.allTasks || []);
    } catch (err) {
      console.log('error', err)
      setData([])
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (task) => {
    setSelectedTask(task); 
    setModalOpen(true); 
  };

  const handleDelete = (task) => {
    setSelectedTask(task); 
    setDeleteModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">All Tasks</h2>
      <div className="flex justify-center">
        { 
          data.length === 0 ? (
            <p className='text-2xl text-black dark:text-white'>No data found</p>
          ) : isLoading ? (
            <RingLoader color="#3498db" size={60} />
          ) : (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.map((el) => (
                <div key={el?._id} className="w-full">
                  <TaskCard 
                    task={el} 
                    onEdit={() => handleEdit(el)} 
                    onDelete={() => handleDelete(el)} 
                  />
                </div>
              ))}
            </div>
          )
        }
      </div>

      {modalOpen && (
        <EditModalDraggable 
          open={modalOpen} 
          data={selectedTask} 
          onClose={handleModalClose}
          fetchData={fetchData}
        />
      )}

      {deleteModalOpen && (
        <DeleteModal
          open={deleteModalOpen} 
          data={selectedTask} 
          onClose={handleDeleteModalClose}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default GetAllTasks;
