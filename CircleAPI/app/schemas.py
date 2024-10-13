from pydantic import BaseModel
from datetime import date, datetime


class UserBase(BaseModel):
    email : str
    password : str


class SignUp(UserBase):
    userType: str
    pass

class SignUpReturn(SignUp):
    userId : int 
    pass

class TutorBase(BaseModel):
    tutorName : str
    tutorEmail : str
    tutorPhone : str
    qualification : str
    userId : int 

class StudentBase(BaseModel):
    studentName : str
    studentEmail : str
    studentPhone : str
    grade : int
    userId : int 

class StudentLoginBase(StudentBase):
    studentId : int
    pass

class TutorCourseBase(BaseModel):
    courseId : int
    courseName : str
    startDate : datetime
    endDate : datetime
    subjectId : int
    tutorId : int

class RegistrationBase(BaseModel):
    courseId : int
    studentId : int
    
class CourseInfo(BaseModel): 
    studentName: str
    tutorName: str
    courseName: str
    subjectName: str
    startDate: datetime
    endDate: datetime
    
    

class TutorUpdate(BaseModel):
    tutorName : str
    tutorEmail : str
    tutorPhone : int
    qualification : str

class StudentUpdate(BaseModel):
    studentName : str
    studentEmail : str
    studentPhone : int
    grade : str