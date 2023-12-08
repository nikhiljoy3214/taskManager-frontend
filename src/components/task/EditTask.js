import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UserEditTask = () => {
  const navigate = useNavigate()
  const params = useParams();
  const taskId = params.taskId;
  const [preTask, setPreTask] = useState({
    title: '',
    description: '',
    status: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/task/getTaskbyId/${taskId}`);
        const data = res.data;
        setPreTask(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [taskId]);

  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: '',
  });

  useEffect(() => {
    if (preTask.title || preTask.description || preTask.status) {
      setTaskData(preTask);
    }
  }, [preTask]);

  const handleChange = (e) => {
    setTaskData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(`/task/editTask/${taskId}`, taskData);


      console.log('Task updated successfully:', res.data);
      navigate('/userHome')

    } catch (error) {

      console.error('Error updating task:', error);
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
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            name="title"
            value={taskData.title}
            onChange={handleChange}
            label="Task Title"
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
          <TextField
            select
            name="status"
            value={taskData.status}
            onChange={handleChange}
            label="Status"
            fullWidth
            margin="normal"
            required
          >
            <MenuItem value={taskData.status}>{taskData.status}</MenuItem>
            {taskData.status === 'pending' ? (
              <MenuItem value="completed">Complete</MenuItem>
            ) : (
              <MenuItem value="pending">Pending</MenuItem>
            )}
          </TextField>

          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </form>
      </div>
    </Box>
  );
};

export default UserEditTask;



