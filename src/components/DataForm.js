import React, { useState } from 'react';
import { Grid, TextField, Button, Box, Typography, Snackbar, Alert, MenuItem } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const cropOptions = ['گوجه‌فرنگی', 'خیار', 'فلفل', 'کاهو'];

function DataForm({ addData }) {
  const [formData, setFormData] = useState({
    soilPh: '',
    temperature: '',
    humidity: '',
    cropType: '',
  });
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const soilPh = parseFloat(formData.soilPh);
    const temperature = parseFloat(formData.temperature);
    const humidity = parseFloat(formData.humidity);

    if (soilPh < 0 || soilPh > 14) {
      alert('لطفاً pH خاک را بین 0 تا 14 وارد کنید.');
      return;
    }
    if (temperature < -10 || temperature > 50) {
      alert('لطفاً دما را بین -10 تا 50 درجه سانتی‌گراد وارد کنید.');
      return;
    }
    if (humidity < 0 || humidity > 100) {
      alert('لطفاً رطوبت را بین 0 تا 100 درصد وارد کنید.');
      return;
    }
    if (!formData.cropType) {
      alert('لطفاً نوع محصول را انتخاب کنید.');
      return;
    }

    addData(formData);
    setFormData({ soilPh: '', temperature: '', humidity: '', cropType: '' });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <Box className="card" sx={{ maxWidth: 500, mx: 'auto', p: 3, bgcolor: 'white' }}>
      <Typography variant="h5" gutterBottom align="center">
        ورود داده‌های گلخانه
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="pH خاک"
              name="soilPh"
              type="number"
              value={formData.soilPh}
              onChange={handleChange}
              fullWidth
              required
              inputProps={{ step: '0.1' }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="دما (°C)"
              name="temperature"
              type="number"
              value={formData.temperature}
              onChange={handleChange}
              fullWidth
              required
              inputProps={{ step: '0.1' }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="رطوبت (%)"
              name="humidity"
              type="number"
              value={formData.humidity}
              onChange={handleChange}
              fullWidth
              required
              inputProps={{ step: '1' }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              label="نوع محصول"
              name="cropType"
              value={formData.cropType}
              onChange={handleChange}
              fullWidth
              required
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            >
              {cropOptions.map((crop) => (
                <MenuItem key={crop} value={crop}>{crop}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              fullWidth
              sx={{ borderRadius: '8px', py: 1.5 }}
            >
              ثبت داده
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: '100%', bgcolor: '#4caf50', color: 'white' }}
        >
          داده با موفقیت ثبت شد!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default DataForm;