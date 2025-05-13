'use client';
import React from 'react'
// Reference: npm install @mui/material @emotion/react @emotion/styled chart.js react-chartjs-2

import { Box, Typography, Paper, Grid } from '@mui/material'
import { Bar } from 'react-chartjs-2'

// Register Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [
    {
      label: 'Users',
      data: [12, 19, 3, 5, 2],
      backgroundColor: 'rgba(63, 81, 181, 0.6)',
    },
  ],
}

const AdminDashboard = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">User Growth</Typography>
            <Bar data={data} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Other Stats</Typography>
            {/* Add more dashboard widgets here */}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AdminDashboard