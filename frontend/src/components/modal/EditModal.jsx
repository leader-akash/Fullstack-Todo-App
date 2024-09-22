import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { EditInputField, EditSelectField, EditTextAreaField } from './EditInputField';
import { toast } from 'react-toastify';

const PaperComponent = (props) => {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}
    className="max-w-2xl mx-auto mt-5  p-8 bg-gray-100 dark:bg-gray-900 dark:text-white rounded-lg shadow-lg"
    sx={{  Width: 500}}
    >
      <Paper className='max-w-2xl mx-auto mt-5  p-8 bg-gray-100 dark:bg-gray-900 dark:text-white rounded-lg shadow-lg' {...props} />
    </Draggable>
  );
};

const EditModalDraggable = ({ open, data, onClose, fetchData }) => {
  // Ensure task exists before rendering modal
  if (!data) return null;

  console.log('task', data)

  const formatTime = (isoDateString) => {
    const date = new Date(isoDateString);
    return `${date.toLocaleDateString()}`;
  };


  const formatDate = new Date(data.date)

  const date = formatDate.toLocaleDateString()

  console.log('date', date  )
  
  const [task, setTask] = useState({
    title: data.title || "",
    description: data.description || "",
    date: data.date ? new Date(data.date).toISOString().split('T')[0] : "" || "",
    timePeriod: data.timePeriod || "",
    completed: data.completed || false
  });
  const [error, setError] = useState();

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayDate = getCurrentDate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      toast.error('Unauthorized: No token found');
      return;
    }

    try {
      const res = await axios.put(`http://localhost:4000/updateTaskById/${data._id}`, task, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        // withCredentials: true
      });

      toast.success(res?.data?.message);
      setTask({
        title:  "",
        description: "",
        date: "",
        timePeriod: "",
        completed: false
      });
      fetchData();
      onClose();
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
    <Dialog
      open={open}
      onClose={onClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      // className="max-w-2xl mx-auto mt-5  p-8 bg-gray-100 dark:bg-gray-900 dark:text-white rounded-lg shadow-lg"
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title"
      
      >
        Edit Task
      </DialogTitle>
      <DialogContent>

        <form className="space-y-6">

          <EditInputField
            label="Title"
            type="text"
            placeholder="Enter title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />

          <EditTextAreaField
            label="Description"
            value={task.description}
            placeholder="Enter task description"
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />

          <EditInputField
            label="Date"
            type="date"
            min={todayDate}
            placeholder="Enter date"
            value={task.date}
            onChange={(e) => setTask({ ...task, date: e.target.value })}
          />

          <EditSelectField
            label="Time Period"
            value={task.timePeriod}
            onChange={(e) => setTask({ ...task, timePeriod: e.target.value })}
            options={timePeriodOptions}
          />  


          <div className="flex items-center space-x-2">
            <input
              id="completed"
              type="checkbox"
              checked={task.completed}
              onChange={(e) => setTask((prev) => ({ ...prev, completed: e.target.checked }))}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <label htmlFor="completed" className="">Completed</label>
          </div>

          {error && <p className='text-red-500 dark:text-red-400 mb-6'>{error}</p>}

          {/* <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition duration-300"
          >
            Create Task
          </button> */}

        </form>

      </DialogContent>
      <DialogActions>
        <Button onClick={() => {onClose}}>Cancel</Button>
        <Button onClick={(e) => {handleSubmit(e)}}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModalDraggable;
