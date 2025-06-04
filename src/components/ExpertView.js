import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

function ExpertView({ data }) {
  const [recommendation, setRecommendation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/recommendations', {
      text: recommendation,
      timestamp: new Date().toISOString(),
    })
      .then(() => {
        alert(`توصیه ثبت شد: ${recommendation}`);
        setRecommendation('');
      })
      .catch((error) => {
        console.error('Error adding recommendation:', error);
      });
  };

  const analyzeSoilPh = (ph) => {
    if (ph >= 6 && ph <= 7) return 'مناسب';
    if (ph < 6) return 'اسیدی (نیاز به اصلاح)';
    return 'قلیایی (نیاز به اصلاح)';
  };

  return (
    <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom>صفحه متخصص</Typography>
      {data.length > 0 ? (
        <>
          {data.map((item) => (
            <Box key={item.id} sx={{ mb: 2 }}>
              <Typography>
                {item.timestamp}: pH خاک: {item.soilPh} ({analyzeSoilPh(item.soilPh)})، دما: {item.temperature}°C، رطوبت: {item.humidity}%، محصول: {item.cropType}
              </Typography>
            </Box>
          ))}
          <form onSubmit={handleSubmit}>
            <TextField
              label="توصیه متخصص"
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value)}
              fullWidth
              multiline
              rows={4}
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              ثبت توصیه
            </Button>
          </form>
        </>
      ) : (
        <Typography>داده‌ای برای تحلیل وجود ندارد.</Typography>
      )}
    </Box>
  );
}

export default ExpertView;