from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from . import models, schemas,crud
from .database import SessionLocal, engine
import json
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware



models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Dependency
def get_db():
    db = SessionLocal()
    try : 
        yield db
    finally:
        db.close()

@app.post("/sign-up/",response_model=schemas.SignUpReturn)
def post_user(userSchema:schemas.SignUp,db:Session=Depends(get_db)):
    user = crud.already_exists(db, userSchema)
    if(user):
        raise HTTPException(status_code=404, detail="User already exists") 
    created_user = crud.create_user(db, userSchema)
    return created_user

@app.post("/login/",response_model=schemas.SignUpReturn)
def post_login(userSchema:schemas.UserBase,db:Session=Depends(get_db)):
    user = crud.check_user(db, userSchema)
    if(user is None):
        raise HTTPException(status_code=404, detail="User not found") 
    return user

@app.post("/tutor-registration/",response_model=schemas.TutorBase)
def post_tutor(tutorSchema:schemas.TutorBase,db:Session=Depends(get_db)):
    tutor = crud.tutor_exists(db, tutorSchema)
    # print(tutor)
    if(tutor):
        raise HTTPException(status_code=404, detail="Tutor already exists") 
    created_tutor = crud.create_tutor(db, tutorSchema)
    return created_tutor

@app.post("/student-registration/",response_model=schemas.StudentBase)
def post_student(studentSchema:schemas.StudentBase,db:Session=Depends(get_db)):
    student = crud.student_exists(db, studentSchema)
    if(student):
        raise HTTPException(status_code=404, detail="Student already exists") 
    created_student = crud.create_student(db, studentSchema)
    return created_student

@app.post("/tutor-course-offerings/",response_model=schemas.TutorCourseBase)
def post_course(tutorcourseSchema:schemas.TutorCourseBase,db:Session=Depends(get_db)):
    course = crud.course_exists(db, tutorcourseSchema)
    if(course):
        raise HTTPException(status_code=404, detail="Course already exists") 
    created_course = crud.create_course(db, tutorcourseSchema)
    return created_course

@app.get("/display-available-courses/",response_model=list[schemas.TutorCourseBase])
def get_course(db:Session=Depends(get_db)):
    try:
        courselist = crud.display_course(db)
        return courselist
    except Exception as e:
        raise HTTPException(status_code=500, detail="An unexpected error occurred. ERROR: "+ str(e))


@app.get("/display-student-enrollment/",response_model=list[schemas.CourseInfo])
def get_display_student_enrollment():
    try:
        json_data = crud.display_student_enrollment(engine)
        return  json.loads(json_data)    
    except Exception as e:
        raise HTTPException(status_code=500, detail="An unexpected error occurred. ERROR: "+ str(e))

@app.post("/student-course-registration/",response_model=schemas.RegistrationBase)
def post_student_course_registration(registrationSchema:schemas.RegistrationBase,db:Session=Depends(get_db)):
    try:
        registration = crud.registration_exists(db, registrationSchema)
        if(registration):
            raise HTTPException(status_code=404, detail="Registration alreday done") 
        created_registration = crud.create_registration(db, registrationSchema)
        return created_registration
    except Exception as e:
        raise HTTPException(status_code=500, detail="An unexpected error occurred. ERROR: "+ str(e))

@app.put("/put-tutor-details/{tutorId}",response_model=schemas.TutorUpdate)
def put_tutor(tutorId:int,tutorSchema:schemas.TutorUpdate,db:Session=Depends(get_db)):
    try:
        tutor = crud.tutor_exists_id(db,tutorId)
        # print(tutorSchema)
        if(not tutor):
            raise HTTPException(status_code=404, detail="Tutor doesn't exists") 
        updated_tutor = crud.update_tutor(db,tutorId,tutorSchema)
        return updated_tutor
    except Exception as e:
        raise HTTPException(status_code=500, detail="An unexpected error occurred. ERROR: "+ str(e))

@app.delete("/delete-tutor-details/{tutorId}")
def delete_tutor(tutorId:int,db:Session=Depends(get_db)):
    try:
        tutor = crud.tutor_exists_id(db,tutorId)
        if(not tutor):
            raise HTTPException(status_code=404, detail="Tutor doesn't exists") 
        deleted_tutor = crud.delete_tutor(db,tutorId)
        return deleted_tutor
    except Exception as e:
        raise HTTPException(status_code=500, detail="An unexpected error occurred. ERROR: "+ str(e))


@app.put("/put-student-details/{studentId}",response_model=schemas.StudentUpdate)
def put_tutor(studentId:int,studentSchema:schemas.StudentUpdate,db:Session=Depends(get_db)):
    try:
        student = crud.student_exists_id(db,studentId)
        if(not student):
            raise HTTPException(status_code=404, detail="Student doesn't exists") 
        updated_student = crud.update_student(db,studentId,studentSchema)
        return updated_student
    except Exception as e:
        raise HTTPException(status_code=500, detail="An unexpected error occurred. ERROR: "+ str(e))


@app.put("/put-user-details/{userId}",response_model=schemas.SignUp)
def put_user_details(userId:int,userSchema:schemas.SignUp,db:Session=Depends(get_db)):
    try:
        json_data = crud.update_user_details(userId,userSchema,db)
        return json_data
    except Exception as e:
        # Handle any other exceptions
        raise HTTPException(status_code=500, detail="An unexpected error occurred. ERROR: "+ str(e))

@app.get("/search-student-enrollment/{searchString}",response_model=list[schemas.CourseInfo])
def get_search_student_enrollment(searchString: str, db: Session = Depends(get_db)):
    try:
        json_data = crud.display_student_enrollment(engine, searchString)
        return json.loads(json_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail="An unexpected error occurred. ERROR: " + str(e))


@app.get("/student-details-by-email/{email}", response_model=schemas.StudentLoginBase)
def get_student_details_by_email(email: str, db: Session = Depends(get_db)):
    try:
        student_details = crud.get_student_by_email(db, email)
        if not student_details:
             raise HTTPException(status_code=404, detail="Student not found")
        return student_details
    except Exception as e:
         raise HTTPException(status_code=500, detail="An unexpected error occurred. ERROR: " + str(e))
    



