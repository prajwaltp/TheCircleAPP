import React, { useEffect } from "react";
import { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import AvailableCourse from "./AvailableCourse";
import { Button } from "react-bootstrap";

const MyCourseRegistrations = () => {
  // State to store courses and search term
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const data = JSON.parse(localStorage.getItem("data"));
  console.log(data);
  const studentId = data.studentData.studentId;

  // Function to fetch courses from the API
  const fetchCourses = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          studentId: studentId,
          searchString: searchTerm,
        }),
      };
      console.log(requestOptions);
      const response = await fetch(
        "http://localhost:3001/get-registrations-by-studentid/",
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setCourses(data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [searchTerm]);

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  const deRegister = async (registrationId) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(
        `http://localhost:3001/delete-registrations-by-studentid/${registrationId}`,
        requestOptions
      );
      if (response.ok) {
        alert("You have succeffully de-registered from the course RegistartionID: " + registrationId);
        fetchCourses();
        // getAvailableCourseDetails()
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="container">
        <AvailableCourse />
        <h2>My Course Registrations</h2>
        <div className="row">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search courses by Course name..."
              onChange={(e) => {
                const searchTerm = e.target.value.toLowerCase();
                setSearchTerm(searchTerm);
              }}
            />
          </div>
        </div>
        <div className="row">
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <div className="col-md-4" key={index}>
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">{course.courseName}</h5>
                    <p className="card-text">Tutor: {course.tutorName}</p>
                    <p className="card-text">Student: {course.studentName}</p>
                    <p className="card-text">Subject: {course.subjectName}</p>
                    <p className="card-text">
                      StartDate: {formatDate(new Date(course.startDate))}
                    </p>
                    <p className="card-text">
                      EndDate: {formatDate(new Date(course.endDate))}
                    </p>
                    <Button onClick={(e) => deRegister(course.registrationId)}>
                      De-register
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No courses available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyCourseRegistrations;
