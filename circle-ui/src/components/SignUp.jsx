import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import NavbarComponent from "./NavbarComponent";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [secPwd, setSecPwd] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [studentGrade, setStudentGrade] = useState("");
  const [tutorName, setTutorName] = useState("");
  const [tutorPhone, setTutorPhone] = useState("");
  const [tutorQualification, setTutorQualification] = useState("");

  function checkPwd() {
    return pwd === secPwd;
  }

  const SignupHandler = async () => {
    if (!checkPwd()) {
      setMessage("Password not matching");
      return;
    } else {
      if (email !== "") {
        const requestOptions = {
          method: "POST",
          headers: { "content-type": "Application/JSON" },
          body: JSON.stringify({
            email: email,
            password: pwd,
            userType: userType,
          }),
        };
        try {
          const response = await fetch(
            "http://localhost:8000/sign-up/",
            requestOptions
          );
          // console.log(requestOptions)
          const data = await response.json();
          if (response.ok) {
            console.log(data.userId);
            // extract user id, email from respone

            const userId = data?.userId;
            // check usertype
            if (userType === "student") {
              // if usertype is student then call newStudentAPI
              const requestOptions = {
                method: "POST",
                headers: { "Content-type": "Application/json" },
                body: JSON.stringify({
                  studentName: studentName,
                  studentEmail: email,
                  studentPhone: studentPhone,
                  grade: parseInt(studentGrade),
                  userId: userId,
                }),
              };
              try {
                const response = await fetch(
                  "http://localhost:8000/student-registration/",
                  requestOptions
                );

                if (response.ok) {
                  setMessage("User added");
                }
              } catch (e) {
                console.error(e);
              }
            } else if (userType === "tutor") {
              // else call tutorapi
              const requestOptions = {
                method: "POST",
                headers: {
                  "Content-type": "Application/json",
                },
                body: JSON.stringify({
                  tutorName: tutorName,
                  tutorEmail: email,
                  tutorPhone: tutorPhone,
                  qualification: tutorQualification,
                  userId: userId,
                }),
              };

              try {
                const response = await fetch(
                  "http://localhost:8000/tutor-registration/",
                  requestOptions
                );
                if (response.ok) {
                  setMessage("User added");
                }
              } catch (e) {
                console.error(e);
              }
            }

            navigate("/login");
          } else {
            setMessage(data.detail);
          }
        } catch (e) {
          console.error("An error occurred. Please try again." + e);
        }
      } else {
        setMessage("Username cannot be empty");
      }
    }
  };

  return (
    <div>
      <NavbarComponent />
      <div className="row">
        <div className="col-lg-4">
          <Form.Group controlId="email">
            <Form.Label>Enter your email:</Form.Label>
            <Form.Control
              required="required"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email here"
            />
          </Form.Group>

          <Form.Group controlId="pwd">
            <Form.Label>Set a new password:</Form.Label>
            <Form.Control
              required="required"
              type="text"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="Enter password here"
            />
          </Form.Group>

          <Form.Group controlId="secpwd">
            <Form.Label>Please re-enter the password:</Form.Label>
            <Form.Control
              required="required"
              type="text"
              value={secPwd}
              onChange={(e) => {
                setSecPwd(e.target.value);
              }}
              placeholder="Re-enter password here"
            />
          </Form.Group>
          <br />
          <Form.Select
            aria-label="Default select example"
            key="userType"
            onChange={(e) => {
              setUserType(e.target.value);
            }}
          >
            <option>Select user type:</option>
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
          </Form.Select>
          {userType === "student" ? (
            <div>
              <h2>Student registration</h2>

              <Form.Group controlId="studentName">
                <Form.Label>Enter student name:</Form.Label>
                <Form.Control
                  required="required"
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter student name"
                />
              </Form.Group>

              <Form.Group controlId="studentPhone">
                <Form.Label>Enter student phone:</Form.Label>
                <Form.Control
                  required="required"
                  type="number"
                  value={studentPhone}
                  onChange={(e) => setStudentPhone(e.target.value)}
                  placeholder="Enter student phone"
                />
              </Form.Group>

              <Form.Select
                key="studentGrade"
                aria-label="Default select example"
                onChange={(e) => {
                  setStudentGrade(e.target.value);
                }}
              >
                <option>Select grade</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                <option value="4">Four</option>
                <option value="5">Five</option>
                <option value="6">Six</option>
                <option value="7">Seven</option>
                <option value="8">Eight</option>
                <option value="9">Nine</option>
                <option value="10">Ten</option>
              </Form.Select>
            </div>
          ) : (
            ""
          )}
          {userType === "tutor" ? (
            <div>
              <h2>Tutor registration</h2>
              <Form.Group controlId="tutorName">
                <Form.Label>Enter tutor name:</Form.Label>
                <Form.Control
                  required="required"
                  type="text"
                  value={tutorName}
                  onChange={(e) => setTutorName(e.target.value)}
                  placeholder="Enter tutor name"
                />
              </Form.Group>

              <Form.Group controlId="tutorPhone">
                <Form.Label>Enter tutor phone:</Form.Label>
                <Form.Control
                  required="required"
                  type="text"
                  value={tutorPhone}
                  onChange={(e) => setTutorPhone(e.target.value)}
                  placeholder="Enter tutor phone"
                />
              </Form.Group>

              <Form.Group controlId="tutorQualification">
                <Form.Label>Enter tutor Qualification:</Form.Label>
                <Form.Control
                  required="required"
                  type="text"
                  value={tutorQualification}
                  onChange={(e) => setTutorQualification(e.target.value)}
                  placeholder="Enter tutor Qualification"
                />
              </Form.Group>
            </div>
          ) : (
            ""
          )}

          <br />
          <Button
            variant="primary"
            onClick={() => {
              SignupHandler();
            }}
          >
            Submit
          </Button>
          <p>{message ? message : ""}</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
