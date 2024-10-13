from sqlalchemy import Column, ForeignKey, Integer, String, DateTime,Numeric
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"
    userId = Column(Integer,primary_key=True,autoincrement=True)
    email = Column(String(50))
    password = Column(String(50))
    userType = Column(String(30))

class Tutor(Base):
    __tablename__ = "tutors"
    tutorId = Column(Integer,primary_key=True,autoincrement=True)
    tutorName = Column(String(50))
    tutorEmail = Column(String(50))
    tutorPhone = Column(String(10))
    qualification = Column(String(50))
    userId = Column(Integer,ForeignKey('users.userId'))

class Student(Base):
    __tablename__ = "students"
    studentId = Column(Integer,primary_key=True,autoincrement=True)
    studentName = Column(String(50))
    studentEmail = Column(String(50))
    studentPhone = Column(String(10))
    grade = Column(Numeric(2))
    userId = Column(Integer,ForeignKey('users.userId'))

class Subject(Base):
    __tablename__ = "subjects"
    subjectId = Column(Integer,primary_key=True,autoincrement=True)
    subjectName = Column(String(50))

class Course(Base):
    __tablename__ = "courses"
    courseId = Column(Integer,primary_key=True,autoincrement=True)
    courseName = Column(String(50))
    startDate = Column(DateTime)
    endDate = Column(DateTime)
    status = Column(String(50))
    subjectId = Column(Integer,ForeignKey('subjects.subjectId'))
    tutorId = Column(Integer,ForeignKey('tutors.tutorId'))

#     courseSubjectRel = relationship('Subject', back_populates='courses')
#     courseTutorRel = relationship('Tutor', back_populates='courses')

class Registration(Base):
    __tablename__ = "registrations"
    registrationId = Column(Integer,primary_key=True,autoincrement=True)
    courseId = Column(Integer,ForeignKey('courses.courseId'))
    studentId = Column(Integer,ForeignKey('students.studentId'))

#     regCourseRel = relationship('Course', back_populates='registrations')
#     regStudentRel = relationship('Student', back_populates='registrations')