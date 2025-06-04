import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import DataForm from './components/DataForm';
import Dashboard from './components/Dashboard';
import ExpertView from './components/ExpertView';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  // بارگذاری داده‌ها از json-server
  useEffect(() => {
    fetch('http://localhost:3003/data')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.error('خطا در بارگذاری داده‌ها:', error);
        // داده آفلاین برای دمو
        setData([
          {
            id: 1,
            soilPh: 6.5,
            temperature: 25,
            humidity: 60,
            cropType: 'گوجه‌فرنگی',
            timestamp: '2025-06-04T07:00:00',
          },
        ]);
      });

    // بارگذاری توصیه‌ها
    fetch('http://localhost:3003/recommendations')
      .then((response) => response.json())
      .then((data) => setRecommendations(data))
      .catch((error) => {
        console.error('خطا در بارگذاری توصیه‌ها:', error);
        setRecommendations([
          { text: 'خاک اسیدی است، آهک اضافه کنید.', timestamp: '2025-06-04T08:30:00' },
        ]);
      });
  }, []);

  // تابع اضافه کردن داده جدید
  const addData = async (formData) => {
    try {
      const newData = {
        ...formData,
        soilPh: parseFloat(formData.soilPh),
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        timestamp: new Date().toISOString(),
      };

      // ارسال به json-server
      const response = await fetch('http://localhost:3003/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        throw new Error('خطا در ذخیره داده در سرور');
      }

      const savedData = await response.json();
      // آپدیت state
      setData((prevData) => [...prevData, savedData]);
    } catch (error) {
      console.error('خطا در اضافه کردن داده:', error);
      // اضافه کردن آفلاین برای دمو
      const offlineData = {
        id: data.length + 1,
        ...formData,
        soilPh: parseFloat(formData.soilPh),
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        timestamp: new Date().toISOString(),
      };
      setData((prevData) => [...prevData, offlineData]);
    }
  };

  // تابع اضافه کردن توصیه
  const addRecommendation = async (text) => {
    try {
      const newRecommendation = {
        text,
        timestamp: new Date().toISOString(),
      };

      // ارسال به json-server
      const response = await fetch('http://localhost:3003/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecommendation),
      });

      if (!response.ok) {
        throw new Error('خطا در ذخیره توصیه');
      }

      const savedRecommendation = await response.json();
      // آپدیت state
      setRecommendations((prevRecommendations) => [...prevRecommendations, savedRecommendation]);
    } catch (error) {
      console.error('خطا در اضافه کردن توصیه:', error);
      // اضافه کردن آفلاین
      setRecommendations((prevRecommendations) => [
        ...prevRecommendations,
        { text, timestamp: new Date().toISOString() },
      ]);
    }
  };

  return (
    <Router>
      <AppBar position="static" sx={{ bgcolor: '#2e7d32' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            سامانه مدیریت گلخانه
          </Typography>
          <Button color="inherit" component={Link} to="/">
            ورود داده
          </Button>
          <Button color="inherit" component={Link} to="/dashboard">
            داشبورد
          </Button>
          <Button color="inherit" component={Link} to="/expert">
            صفحه متخصص
          </Button>
        </Toolbar>
      </AppBar>
      <Container className="container">
        <Routes>
          <Route path="/" element={<DataForm addData={addData} />} />
          <Route path="/dashboard" element={<Dashboard data={data} />} />
          <Route
            path="/expert"
            element={<ExpertView data={data} recommendations={recommendations} addRecommendation={addRecommendation} />}
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;