import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { sendUserAuthRequest } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const LoginForm = ({ open, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!inputs.email || !inputs.password) {

      toast.error('Please enter all required fields');
      return;
    }

    try {
      const response = await sendUserAuthRequest(inputs);
      console.log(response);


      if (response.id) {

        dispatch(userActions.login(inputs));


        localStorage.setItem('userId', response.id);

        toast.success('Login successful!');
        onClose();
        navigate('/userHome');
      } else {

        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);

    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={{ textAlign: 'center' }}>Login</DialogTitle>
      <DialogContent>
        <TextField
          name="email"
          value={inputs.email}
          onChange={handleChange}
          label="Enter email"
          fullWidth
          margin="normal"
        />
        <TextField
          name="password"
          value={inputs.password}
          onChange={handleChange}
          label="Password"
          fullWidth
          margin="normal"
          type="password"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleLogin} color="primary">
          Login
        </Button>
      </DialogActions>
      <ToastContainer></ToastContainer>
    </Dialog>
  );
};

export default LoginForm;
