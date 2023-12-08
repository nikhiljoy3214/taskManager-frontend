import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserAddTask = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    setTaskData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/task/addTask', {
        title: taskData.title,
        description: taskData.description,
        userId: userId,
      });

      if (!response.data) {
        throw new Error('Failed to create task');
      }

      const createdTask = response.data;
      console.log('Newly created task:', createdTask);


      toast.success('Task created successfully', {
        onClose: () => {

          navigate('/userHome');
        },
      });


      setTaskData({
        title: '',
        description: '',
      });
    } catch (error) {
      console.error('Error creating task:', error);

      toast.error('Failed to create task. Please try again.');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="70vh"
    >
      <div style={{ width: '50%' }}>
        <h2>Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            name="title"
            value={taskData.title}
            onChange={handleChange}
            label="Task title"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="description"
            value={taskData.description}
            onChange={handleChange}
            label="Task Description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Create Task
          </Button>
        </form>
      </div>
      <ToastContainer />
    </Box>
  );
};

export default UserAddTask;
