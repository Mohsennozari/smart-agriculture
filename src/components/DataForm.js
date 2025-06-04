import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem, Typography } from '@mui/material';

const cropOptions = ['گوجه‌فرنگی', 'خیار', 'فلفل', 'کاهو'];

function DataForm({ addData }) {
  const [formData, setFormData] = useState({
    soilPh: '',
    temperature: '',
    humidity: '',
    cropType: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addData(formData);
    setFormData({ soilPh: '', temperature: '', humidity: '', cropType: '' });
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', p: 2, bgcolor: 'white', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom>ورود داده‌های گلخانه</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="pH خاک"
          name="soilPh"
          type="number"
          value={formData.soilPh}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="دما (°C)"
          name="temperature"
          type="number"
          value={formData.temperature}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="رطوبت (%)"
          name="humidity"
          type="number"
          value={formData.humidity}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          select
          label="نوع محصول"
          name="cropType"
          value={formData.cropType}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          {cropOptions.map((crop) => (
            <MenuItem key={crop} value={crop}>{crop}</MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          ثبت داده
        </Button>
      </form>
    </Box>
  );
}

export default DataForm;