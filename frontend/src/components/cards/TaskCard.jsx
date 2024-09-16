import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TaskCard = ({ task, onEdit, onDelete }) => {

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <div className="min-w-84 h-60 mx-auto bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden mb-4 border border-gray-200">
      <div className="px-4 py-3 h-full flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{task.title || "Title"}</h2>
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500 transition duration-200"
              title="Edit Task"
            >
              <FaEdit size={20} />
            </button>
            <button
              onClick={onDelete}
              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-500 transition duration-200"
              title="Delete Task"
            >
              <FaTrash size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-2 gap-y-1 overflow-auto">
          <div className="font-semibold text-left text-gray-700 dark:text-gray-400">Description:</div>
          <p className="text-gray-600 dark:text-gray-300 text-left">{task.description || "Description"}</p>

          <div className="font-semibold text-left text-gray-700 dark:text-gray-400">Date:</div>
          <p className="text-gray-600 dark:text-gray-300 text-left">{task.date ? formatDate(task.date) : "Date"}</p>

          <div className="font-semibold text-left text-gray-700 dark:text-gray-400">Time Period:</div>
          <p className="text-gray-600 dark:text-gray-300 text-left">{task.timePeriod || "Time Period"}</p>

          <div className="font-semibold text-left text-gray-700 dark:text-gray-400">Status:</div>
          <p className={`text-left ${task.completed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {task.completed ? 'Completed' : 'Pending'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
