import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { userSignUp } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../../store';
import { useDispatch } from 'react-redux';

const SignupForm = ({ open, onClose }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [emailError, setEmailError] = useState('');

  const handleChange = (e) => {
    setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailBlur = () => {
    if (inputs.email && !validateEmail(inputs.email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!inputs.name || !inputs.email || !inputs.password) {

      alert('Please enter all required fields');
      return;
    }


    if (!validateEmail(inputs.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    const data = {
      inputs: inputs,
      signup: true,
    };

    userSignUp(data.inputs, data.signup)
      .then((res) => {
        console.log(res);
        dispatch(userActions.login(inputs));


        localStorage.setItem('userId', res.id);
        navigate('/userHome');
      })
      .catch((err) => {
        console.error(err);
        alert('Signup failed. Please try again.');
      });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={{ textAlign: 'center' }}>Signup</DialogTitle>
      <DialogContent>
        <TextField
          value={inputs.name}
          onChange={handleChange}
          name="name"
          label="Username"
          fullWidth
          margin="normal"
        />
        <TextField
          value={inputs.email}
          onChange={handleChange}
          onBlur={handleEmailBlur}
          name="email"
          label="Email"
          fullWidth
          margin="normal"
          type="email"
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          value={inputs.password}
          onChange={handleChange}
          name="password"
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
        <Button onClick={handleSignup} color="primary">
          Signup
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignupForm;
