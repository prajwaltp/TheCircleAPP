// src/App.js
// Importing React library
import React,{useEffect, useState} from 'react';
import { Container, Navbar, Nav, Row, Col, Button } from 'react-bootstrap';
import MyCourseRegistrations from './components/MyCourseRegistrations';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import NavbarComponent from './components/NavbarComponent';
import LoginPage from './components/LoginPage';
import SignUp from './components/SignUp';

function App() {
 
  return (
    <div>
        <Router>
          <Routes>
            <Route path="*" element={<HomePage />}  />
            <Route path="/courses" element={<MyCourseRegistrations />}   />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/signup" element={<SignUp/>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
