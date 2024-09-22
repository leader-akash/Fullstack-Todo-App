import React from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteModal = ({ open, data, onClose, fetchData }) => {
  const handleDelete = async () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      toast.error('Unauthorized: No token found');
      return;
    }

    try {
      await axios.delete(`http://localhost:4000/deleteTaskById/${data._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('Task deleted successfully');
      onClose();
      fetchData(); 
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Error deleting task');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete this <b>{data?.title}</b> task?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDelete} color="primary">Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
