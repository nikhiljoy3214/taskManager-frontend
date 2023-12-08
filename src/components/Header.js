import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LoginForm from './Auth/LoginForm'; // Adjust the path based on your project structure
import SignupForm from './Auth/SignupForm'; // Adjust the path based on your project structure
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store';
import { Link } from 'react-router-dom';
import { Tab } from '@mui/material';

function Header() {
  const [isLoginFormOpen, setLoginFormOpen] = useState(false);
  const [isSignupFormOpen, setSignupFormOpen] = useState(false);
  //   const navigate=useNavigate()
  const dispatch = useDispatch()
  const isUserAdminLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const handleLoginClick = () => {
    setLoginFormOpen(true);
  };

  const handleSignupClick = () => {
    setSignupFormOpen(true);
  };

  const handleCloseLoginForm = () => {
    setLoginFormOpen(false);
  };

  const handleCloseSignupForm = () => {
    setSignupFormOpen(false);
  };

  const logout = () => {
    dispatch(userActions.logout())
  }

  console.log(isUserAdminLoggedIn);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          {!isUserAdminLoggedIn &&

            <>
              <Button color="inherit" onClick={handleLoginClick}>
                Login
              </Button>
              <Button color="inherit" onClick={handleSignupClick}>
                Signup
              </Button>

            </>

          }

          {
            isUserAdminLoggedIn && (
              <>
              <Button LinkComponent={Link} to="/userHome" color="inherit" >
                Home
              </Button>
              <Button LinkComponent={Link} to="/add" color="inherit" >
                Add Task
              </Button>
              <Button onClick={() => logout(true)} LinkComponent={Link} to="/" color="inherit" >
                Logout
              </Button>
              
                
              </>
            )
          }


        </Toolbar>
      </AppBar>
      <LoginForm open={isLoginFormOpen} onClose={handleCloseLoginForm} />
      <SignupForm open={isSignupFormOpen} onClose={handleCloseSignupForm} />
    </Box >
  );
}

export default Header;
