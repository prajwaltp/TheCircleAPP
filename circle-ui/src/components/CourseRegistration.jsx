import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";

const CourseRegistration = () => {
  const [rowData, setRowData] = useState([]);
  const data = JSON.parse(localStorage.getItem("data"));
  console.log(data);
  const studentId = data.studentData.studentId;

  const getAvailableCourseDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/get-courses-by-studentid/${studentId}`
      );
      const data = await response.json();
      console.log(data);
      setRowData(data);
    } catch (e) {
      console.error(e);
    }
  };
  const registrationHandler = async (courseId) => {
    alert("CourseID  " + courseId + " " + data.studentData.studentId);
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: parseInt(courseId),
          studentId: parseInt(data.studentData.studentId),
        }),
      };
      const response = await fetch(
        "http://localhost:8000/student-course-registration/",
        requestOptions
      );
      if (response.ok) {
        alert("Student registered");
        getAvailableCourseDetails()
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getAvailableCourseDetails();
    // console.log("AvailableCourse" + rowData);
  }, []);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rowData &&
            rowData.map((course, index) => (
              <tr key={index}>
                <td>{course.courseName}</td>
                <td>{course.startDate}</td>
                <td>{course.endDate}</td>
                <td>
                  <Button
                    onClick={() => {
                      registrationHandler(course.courseId);
                    }}
                  >
                    Register
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CourseRegistration;
