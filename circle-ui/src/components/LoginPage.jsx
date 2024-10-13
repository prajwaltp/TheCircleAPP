import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import NavbarComponent from "./NavbarComponent"; // Adjust the path as necessary

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function loginHandler() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    };
    try {
      const response = await fetch(
        "http://localhost:8000/login",
        requestOptions
      );
      const data = await response.json();
      const email = data.email;
      if (response.ok) {
        if (data.userType === "student") {
          try {
            const response = await fetch(
              `http://localhost:8000/student-details-by-email/${email}`
            );
            const studentData = await response.json();
            console.log(studentData);
            localStorage.setItem("data", JSON.stringify({ studentData }));
          } catch (e) {
            console.error(e);
          }
        } else if (data.userType === "tutor") {
          //tutor
        }

        setMessage("Login successful");
        alert("Login successful");
        setUsername("");
        setPassword("");
        navigate("/");
      } else {
        setMessage(data.detail);
        navigate("/login");
      }
    } catch (error) {
      console.error("An error occurred. Please try again." + error);
    }
  }

  return (
    <div>
      <NavbarComponent />
      <h1>Please enter your credentials to login</h1>

      <Form.Group controlId="username">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username here"
        />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password here"
        />
      </Form.Group>
      {message && <p>{message}</p>}
      <br />
      <Button
        variant="primary"
        onClick={() => {
          loginHandler();
        }}
      >
        Submit
      </Button>
      <div>
        <p>
          Not a user?<Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
