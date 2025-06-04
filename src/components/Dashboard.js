import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem, Stack } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard({ data }) {
  const [filterCrop, setFilterCrop] = useState('همه');
  const crops = ['همه', ...new Set(data.map(item => item.cropType))];

  const filteredData = filterCrop === 'همه' ? data : data.filter(item => item.cropType === filterCrop);

  const chartData = {
    labels: filteredData.map((item) => item.timestamp.slice(0, 10)),
    datasets: [
      {
        label: 'دما (°C)',
        data: filteredData.map((item) => item.temperature),
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
      },
      {
        label: 'رطوبت (%)',
        data: filteredData.map((item) => item.humidity),
        borderColor: '#0288d1',
        backgroundColor: 'rgba(2, 136, 209, 0.2)',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'تحلیل دما و رطوبت', font: { size: 16 } },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <Box className="card" sx={{ p: 3, bgcolor: 'white' }}>
      <Typography variant="h5" gutterBottom align="center">
        داشبورد داده‌ها
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
        <FilterListIcon sx={{ color: '#2e7d32' }} />
        <FormControl sx={{ width: 300 }}>
          <InputLabel>فیلتر محصول</InputLabel>
          <Select
            value={filterCrop}
            onChange={(e) => setFilterCrop(e.target.value)}
            sx={{ borderRadius: '8px' }}
          >
            {crops.map((crop) => (
              <MenuItem key={crop} value={crop}>{crop}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      {filteredData.length > 0 ? (
        <>
          <Line data={chartData} options={chartOptions} />
          <Box sx={{ mt: 3 }}>
            {filteredData.map((item) => (
              <Typography key={item.id} sx={{ mb: 1, bgcolor: '#f5f5f5', p: 1, borderRadius: '4px' }}>
                {item.timestamp}: pH خاک: {item.soilPh}، دما: {item.temperature}°C، رطوبت: {item.humidity}%، محصول: {item.cropType}
              </Typography>
            ))}
          </Box>
        </>
      ) : (
        <Typography align="center" sx={{ color: '#666' }}>
          داده‌ای برای نمایش وجود ندارد.
        </Typography>
      )}
    </Box>
  );
}

export default Dashboard;