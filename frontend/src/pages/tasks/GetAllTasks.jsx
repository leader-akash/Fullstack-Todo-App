import React, { useEffect, useState } from 'react';
import TaskCard from '../../components/cards/TaskCard';
import { toast } from 'react-toastify';
import axios from 'axios';
import { RingLoader } from 'react-spinners';
import EditModalDraggable from '../../components/modal/EditModal';

const GetAllTasks = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // For controlling modal visibility
  const [selectedTask, setSelectedTask] = useState(null); // For storing the task to be edited

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('http://localhost:4000/getAllTasks');
      setData(res?.data?.allTasks || []);
    } catch (err) {
      toast.error(err?.response?.data?.error || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (task) => {
    setSelectedTask(task); // Set the selected task to be edited
    setModalOpen(true); // Open the modal
  };

  const handleDelete = (task) => {
    // Use the same modal for delete or create another one for delete confirmation
    setSelectedTask(task); 
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false); // Close the modal
    setSelectedTask(null); // Clear the selected task
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">All Tasks</h2>
      <div className="flex justify-center items-center min-h-screen">
        {isLoading ? (
          <RingLoader color="#3498db" size={60} />
        ) : (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((el) => (
              <div key={el?._id} className="w-full">
                <TaskCard 
                  task={el} 
                  onEdit={() => handleEdit(el)} // Pass the task to be edited
                  onDelete={() => handleDelete(el)} // Handle task deletion
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for editing task */}
      {modalOpen && (
        <EditModalDraggable 
          open={modalOpen} 
          task={selectedTask} // Pass the selected task to the modal
          onClose={handleModalClose} // Close the modal when finished
        />
      )}
    </div>
  );
};

export default GetAllTasks;
