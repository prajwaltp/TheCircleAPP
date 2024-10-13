import React,{useState} from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';


const NavbarComponent = (props) => {
const navigate = useNavigate();
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">The Circle</Navbar.Brand>
      <Nav className="mr-auto">
        
           
            {/* <Nav.Link onClick={()=>{localStorage.removeItem('user')}} className="align-right">
              Logout
            </Nav.Link> */}
         {localStorage.getItem('data') ?
         <>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/courses">Student Registrations</Nav.Link>
            <Nav.Link onClick={()=>{localStorage.removeItem('data') ;
                navigate("/login")

            }} className="align-right">
            Logout
          </Nav.Link>
          </>
            :
            <Nav.Link href="/login" className="align-right">
              Login
            </Nav.Link>}
        
      </Nav>
    </Navbar>
  );
};
export default NavbarComponent;
