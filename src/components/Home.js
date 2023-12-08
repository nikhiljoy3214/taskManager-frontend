import React from 'react';
import { Grid, Typography, Box } from '@mui/material';

function Home() {
  return (
    <Grid container spacing={2} style={{ height: '100vh', overflow: 'hidden' }}>

      <Grid item xs={12} md={6}>
        <img
          src="https://i.postimg.cc/9Q0qJvMj/Pngtree-employee-finished-work-on-his-13000810.png"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Grid>


      <Grid item xs={12} md={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Task Management App
          </Typography>
          <Typography variant="body1">
            Welcome to TaskMaster, your go-to platform for efficient and organized task management. Whether you're an individual looking to stay on top of personal responsibilities or a team striving for peak productivity, TaskMaster has you covered.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Home;
