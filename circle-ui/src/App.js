// src/App.js
// Importing React library
import React,{useEffect, useState} from 'react';
import { Container, Navbar, Nav, Row, Col, Button } from 'react-bootstrap';
import AvailableCourses from './components/AvailableCourses';
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
            <Route path="/courses" element={<AvailableCourses />}   />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/signup" element={<SignUp/>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
