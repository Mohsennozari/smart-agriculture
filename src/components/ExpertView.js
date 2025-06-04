import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Snackbar, Alert } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

function ExpertView({ data, recommendations, addRecommendation }) {
  const [recommendation, setRecommendation] = useState('');
  const [open, setOpen] = useState(false);

  // تعریف متغیرهای مشترک
  const optimalTemps = {
    'گوجه‌فرنگی': [21, 27],
    'خیار': [20, 25],
    'فلفل': [18, 24],
    'کاهو': [15, 21],
  };

  const optimalHumidities = {
    'گوجه‌فرنگی': [60, 80],
    'خیار': [70, 90],
    'فلفل': [65, 85],
    'کاهو': [50, 70],
  };

  const analyzeSoilPh = (ph) => {
    if (ph >= 6 && ph <= 7) return 'مناسب';
    if (ph < 6) return 'اسیدی (نیاز به اصلاح)';
    return 'قلیایی (نیاز به اصلاح)';
  };

  const analyzeTemperature = (temp, cropType) => {
    const [min, max] = optimalTemps[cropType] || [15, 30];
    if (temp < min) return `دما پایین است (بهینه: ${min}-${max}°C)`;
    if (temp > max) return `دما بالا است (بهینه: ${min}-${max}°C)`;
    return `دما مناسب است (${min}-${max}°C)`;
  };

  const analyzeHumidity = (humidity, cropType) => {
    const [min, max] = optimalHumidities[cropType] || [50, 80];
    if (humidity < min) return `رطوبت پایین است (بهینه: ${min}-${max}%)`;
    if (humidity > max) return `رطوبت بالا است (بهینه: ${min}-${max}%)`;
    return `رطوبت مناسب است (${min}-${max}%)`;
  };

  const getAutoRecommendation = (item) => {
    const recommendations = [];
    if (item.soilPh < 6) recommendations.push('توصیه: برای اصلاح خاک اسیدی، آهک اضافه کنید.');
    if (item.soilPh > 7) recommendations.push('توصیه: برای اصلاح خاک قلیایی، گوگرد اضافه کنید.');
    const [minTemp, maxTemp] = optimalTemps[item.cropType] || [15, 30];
    if (item.temperature < minTemp) recommendations.push(`توصیه: دما را به ${minTemp}-${maxTemp}°C افزایش دهید.`);
    if (item.temperature > maxTemp) recommendations.push(`توصیه: دما را به ${minTemp}-${maxTemp}°C کاهش دهید.`);
    const [minHum, maxHum] = optimalHumidities[item.cropType] || [50, 80];
    if (item.humidity < minHum) recommendations.push(`توصیه: رطوبت را به ${minHum}-${maxHum}% افزایش دهید.`);
    if (item.humidity > maxHum) recommendations.push(`توصیه: رطوبت را به ${minHum}-${maxHum}% کاهش دهید.`);
    return recommendations.join(' ');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!recommendation.trim()) {
      alert('لطفاً توصیه‌ای وارد کنید.');
      return;
    }
    addRecommendation(recommendation);
    setRecommendation('');
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <Box className="card" sx={{ p: 3, bgcolor: 'white' }}>
      <Typography variant="h5" gutterBottom align="center">
        صفحه متخصص
      </Typography>
      {data.length > 0 ? (
        <>
          <Typography variant="h6" gutterBottom>داده‌های گلخانه</Typography>
          {data.map((item) => (
            <Box key={item.id} sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: '8px' }}>
              <Typography color={analyzeSoilPh(item.soilPh).includes('مناسب') ? '#4caf50' : '#d32f2f'}>
                pH خاک: {item.soilPh} ({analyzeSoilPh(item.soilPh)})
              </Typography>
              <Typography color={analyzeTemperature(item.temperature, item.cropType).includes('مناسب') ? '#4caf50' : '#d32f2f'}>
                دما: {item.temperature}°C ({analyzeTemperature(item.temperature, item.cropType)})
              </Typography>
              <Typography color={analyzeHumidity(item.humidity, item.cropType).includes('مناسب') ? '#4caf50' : '#d32f2f'}>
                رطوبت: {item.humidity}% ({analyzeHumidity(item.humidity, item.cropType)})
              </Typography>
              <Typography>محصول: {item.cropType}</Typography>
              <Typography>زمان: {item.timestamp}</Typography>
              <Typography sx={{ mt: 1, fontStyle: 'italic', color: '#0288d1' }}>
                {getAutoRecommendation(item)}
              </Typography>
            </Box>
          ))}
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            توصیه‌های قبلی
          </Typography>
          {recommendations.length > 0 ? (
            recommendations.map((rec, index) => (
              <Typography key={index} sx={{ mb: 1, bgcolor: '#e8f5e9', p: 1, borderRadius: '4px' }}>
                {rec.timestamp}: {rec.text}
              </Typography>
            ))
          ) : (
            <Typography sx={{ color: '#666' }}>توصیه‌ای ثبت نشده است.</Typography>
          )}
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
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              fullWidth
              sx={{ borderRadius: '8px', py: 1.5 }}
            >
              ثبت توصیه
            </Button>
          </form>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: '100%', bgcolor: '#4caf50', color: 'white' }}
            >
              توصیه با موفقیت ثبت شد!
            </Alert>
          </Snackbar>
        </>
      ) : (
        <Typography align="center" sx={{ color: '#666' }}>
          داده‌ای برای تحلیل وجود ندارد.
        </Typography>
      )}
    </Box>
  );
}

export default ExpertView;