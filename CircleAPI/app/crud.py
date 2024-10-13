from sqlalchemy.orm import Session
from sqlalchemy import text

from . import models,schemas
import json
import pandas as pd

def create_user(db: Session, userSchema:schemas.SignUp):
    db_user = models.User(email=userSchema.email,
                          password=userSchema.password,
                          userType=userSchema.userType)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def already_exists(db: Session, LoginSchema:schemas.SignUp):   
    user = db.query(models.User).filter(models.User.email == LoginSchema.email).first()
    db.commit()
    return user

def check_user(db: Session, LoginSchema:schemas.UserBase):   
    result = db.query(models.User).filter(models.User.email == LoginSchema.email,
     models.User.password == LoginSchema.password).first()
    db.commit()
    return result

def create_tutor(db: Session, tutorSchema:schemas.TutorBase):
    db_tutor = models.Tutor(tutorName = tutorSchema.tutorName,
                            tutorEmail = tutorSchema.tutorEmail,
                            tutorPhone = tutorSchema.tutorPhone,
                            qualification = tutorSchema.qualification,
                            userId = tutorSchema.userId)
    db.add(db_tutor)
    db.commit()
    db.refresh(db_tutor)
    return db_tutor


def tutor_exists(db: Session, tutorSchema:schemas.TutorBase):   
    user = db.query(models.Tutor).filter(models.Tutor.tutorEmail == tutorSchema.tutorEmail).first()
    db.commit()
    return user

def create_student(db: Session, studentSchema:schemas.StudentBase):
    db_student = models.Student(studentName = studentSchema.studentName,
                            studentEmail = studentSchema.studentEmail,
                            studentPhone = studentSchema.studentPhone,
                            grade = studentSchema.grade,
                            userId = studentSchema.userId)
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

def student_exists(db: Session, studentSchema:schemas.StudentBase):   
    user = db.query(models.Student).filter(models.Student.studentEmail == studentSchema.studentEmail).first()
    db.commit()
    return user


def create_course(db: Session, courseSchema:schemas.TutorCourseBase):
    db_course = models.Course(courseName = courseSchema.courseName,
                            startDate = courseSchema.startDate,
                            endDate = courseSchema.endDate,
                            subjectId = courseSchema.subjectId,
                            tutorId = courseSchema.tutorId)
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course

def course_exists(db: Session, courseSchema:schemas.TutorCourseBase):   
    course = db.query(models.Course).filter(models.Course.courseName == courseSchema.courseName).first()
    db.commit()
    return course

def display_course(db: Session): 
    return db.query(models.Course).all()


def create_registration(db: Session, courseSchema:schemas.RegistrationBase):
    db_registration = models.Registration(courseId = courseSchema.courseId,
                            studentId = courseSchema.studentId)
    db.add(db_registration)
    db.commit()
    db.refresh(db_registration)
    return db_registration

def registration_exists(db: Session, registrationSchema:schemas.RegistrationBase):   
    registration = db.query(models.Registration).filter(models.Registration.courseId == registrationSchema.courseId,models.Registration.studentId == registrationSchema.studentId).first()
    db.commit()
    return registration

def display_student_enrollment(engine,searchString=None):
    print("Hello")
    if searchString:
        query_string = text("""
            SELECT s2.studentName,t.tutorName,c.courseName,s.subjectName,startDate, endDate FROM circledb.courses c,circledb.tutors t,circledb.subjects s,circledb.students s2 ,circledb.registrations r where 1=1 and c.tutorId = t.tutorId and s.subjectId = c.subjectId and s2.studentId = r.studentId and r.courseId = c.courseId and c.courseName LIKE :searchString
        """)
        df = pd.read_sql_query(query_string, engine, params={"searchString": f"%{searchString}%"})
    else:
        df = pd.read_sql_query("SELECT s2.studentName,t.tutorName,c.courseName,s.subjectName,startDate, endDate FROM circledb.courses c,circledb.tutors t,circledb.subjects s,circledb.students s2 ,circledb.registrations r where 1=1 and c.tutorId = t.tutorId and s.subjectId = c.subjectId and s2.studentId = r.studentId and r.courseId = c.courseId", engine)
    # Convert the DataFrame to JSON
    json_data = df.to_json(orient='records', indent=4)
    return json_data

def update_tutor(db: Session,tutorId:int, tutorSchema:schemas.TutorUpdate):
    db_item = db.query(models.Tutor).filter(models.Tutor.tutorId == tutorId).first()
    if db_item:
        for key, value in tutorSchema.dict(exclude_unset=True).items():
                setattr(db_item, key, value)
        db.commit()
        db.refresh(db_item)
    return db_item

def tutor_exists_id(db: Session,tutorId: int):   
    user = db.query(models.Tutor).filter(models.Tutor.tutorId == tutorId).first()
    db.commit()
    return user

def delete_tutor(db: Session,tutorId: int): 
    db_item = db.query(models.Tutor).filter(models.Tutor.tutorId == tutorId).first()
    if db_item:
        db.delete(db_item)
        db.commit()
        return db_item
    return None

def student_exists_id(db: Session,studentId: int):   
    user = db.query(models.Student).filter(models.Student.studentId == studentId).first()
    db.commit()
    return user

def update_student(db: Session,studentId:int, tutorSchema:schemas.StudentUpdate):
    db_item = db.query(models.Student).filter(models.Student.studentId == studentId).first()
    if db_item:
        for key, value in tutorSchema.dict(exclude_unset=True).items():
                setattr(db_item, key, value)
        db.commit()
        db.refresh(db_item)
    return db_item

def update_user_details(userId:int,userSchema:schemas.SignUp,db: Session):
    sql = text("UPDATE users SET email=:email, password=:password WHERE userId=:userId")
    json_data = db.execute(sql,{"email": userSchema.email, "password": userSchema.password,"userId":userId})
    db.commit()
    return userSchema

def get_student_by_email(db: Session, email: str):
    student = db.query(models.Student).filter(models.Student.studentEmail == email).first()
    print(student)
    return student

# Define the parameterized SQL query
        # Execute the query with parameters
# NOTE :
# - add that instance object to your database session.
# - commit the changes to the database (so that they are saved).
# - refresh your instance (so that it contains any new data from the database, like the generated ID).