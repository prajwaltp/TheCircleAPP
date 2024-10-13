// src/pages/NewPage.js
import React,{useState} from 'react';
import NavbarComponent from './NavbarComponent';

const HomePage = () => {
const data = JSON.parse(localStorage.getItem('data'));
console.log(data)


  return (
    <div>
       <NavbarComponent />
       {data?.studentData ?
       <>
      <h1>Welcome {data?.studentData?.studentName } to the Home Page</h1>
      <p>This is a new page in our React application.</p></>
      :<h1>You've not logged in. Please login</h1>}
    </div>
  );
};

export default HomePage;
