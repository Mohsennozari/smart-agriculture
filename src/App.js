import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import axios from 'axios';
import DataForm from './components/DataForm';
import Dashboard from './components/Dashboard';
import ExpertView from './components/ExpertView';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  // داده‌ها رو از json-server بگیر
  useEffect(() => {
    axios.get('http://localhost:3002/data') // پورت رو به 3002 تغییر دادیم
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // اضافه کردن داده جدید
  const addData = (newData) => {
    axios.post('http://localhost:3002/data', { // پورت رو به 3002 تغییر دادیم
      ...newData,
      id: data.length + 1,
      timestamp: new Date().toISOString(),
    })
      .then((response) => {
        setData([...data, response.data]);
      })
      .catch((error) => {
        console.error('Error adding data:', error);
      });
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            پلتفرم کشاورزی هوشمند
          </Typography>
          <Button color="inherit" component={Link} to="/">فرم ورود داده</Button>
          <Button color="inherit" component={Link} to="/dashboard">داشبورد</Button>
          <Button color="inherit" component={Link} to="/expert">متخصص</Button>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px' }}>
        <Routes>
          <Route path="/" element={<DataForm addData={addData} />} />
          <Route path="/dashboard" element={<Dashboard data={data} />} />
          <Route path="/expert" element={<ExpertView data={data} />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;