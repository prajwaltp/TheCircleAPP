import express from 'express';
import cors from 'cors';
import mysql from  'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',// Your MySQL host
  port:'3307', 
  user: 'root', // Your MySQL username
  password: 'root', // Your MySQL password
  database: 'circledb' // Your MySQL database name
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});

const corsOptions = {
    origin: ['http://localhost:3000', 'localhost:3000'], // Replace with your allowed origins
    credentials: false
  };
  
 

const app = express();
app.use(express.json());
const PORT = 3001;
app.use(cors(corsOptions));

// Basic route
app.get('/', (_req, res) => {
  });

app.get('/get-courses-by-studentid/:studentId', (req, res) => {
    const studentId = req.params.studentId;
    connection.query(`select * from circledb.courses where courseId not in (select courseId from circledb.registrations where studentId = ${studentId})`, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  }); 


app.post('/get-registrations-by-studentid', (req, res) => {
    try{
    const {studentId,searchString}= req.body
    
    if(searchString){
        connection.query(`SELECT r.registrationId,s2.studentName,t.tutorName,c.courseName,s.subjectName,startDate, endDate FROM circledb.courses c,circledb.tutors t,circledb.subjects s,circledb.students s2 ,circledb.registrations r where 1=1 and c.tutorId = t.tutorId and s.subjectId = c.subjectId and s2.studentId = r.studentId and r.courseId = c.courseId and c.courseName LIKE '%${searchString}%' and s2.studentId = ${studentId}`, (err, results) => {
                 if (err) throw err;
                 res.json(results);
               });
    }else{
        connection.query(`SELECT r.registrationId,s2.studentName,t.tutorName,c.courseName,s.subjectName,startDate, endDate FROM circledb.courses c,circledb.tutors t,circledb.subjects s,circledb.students s2 ,circledb.registrations r where 1=1 and c.tutorId = t.tutorId and s.subjectId = c.subjectId and s2.studentId = r.studentId and r.courseId = c.courseId and s2.studentId = ${studentId}`, (err, results) => {
                 if (err) throw err;
                 res.json(results);
               });
    }
}catch(e){
    console.error(e)
}
  });  



  app.delete('/delete-registrations-by-studentid/:registrationId', (req, res) => {
    try{
        const registrationId = req.params.registrationId;
        connection.query(`DELETE FROM circledb.registrations r where 1=1 and r.registrationId = ${registrationId}`, (err, results) => {
                 if (err) throw err;
                 res.json(results);
               });
}catch(e){
    console.error(e)
}
  });

app.listen(PORT, () => {
    console.log(`hello world on PORT ${PORT}!`);
  });