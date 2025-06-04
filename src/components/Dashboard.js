import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Typography, Box } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard({ data }) {
  const chartData = {
    labels: data.map((item) => item.timestamp.slice(0, 10)),
    datasets: [
      {
        label: 'دما (°C)',
        data: data.map((item) => item.temperature),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
      {
        label: 'رطوبت (%)',
        data: data.map((item) => item.humidity),
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
      },
    ],
  };

  return (
    <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom>داشبورد داده‌ها</Typography>
      {data.length > 0 ? (
        <>
          <Line data={chartData} options={{ responsive: true }} />
          <Box sx={{ mt: 2 }}>
            {data.map((item) => (
              <Typography key={item.id}>
                {item.timestamp}: pH خاک: {item.soilPh}، دما: {item.temperature}°C، رطوبت: {item.humidity}%، محصول: {item.cropType}
              </Typography>
            ))}
          </Box>
        </>
      ) : (
        <Typography>داده‌ای برای نمایش وجود ندارد.</Typography>
      )}
    </Box>
  );
}

export default Dashboard;
