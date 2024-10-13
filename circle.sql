use circledb;
SELECT s2.studentName,t.tutorName,c.courseName,s.subjectName,startDate, endDate FROM circledb.courses c,circledb.tutors t,circledb.subjects s,circledb.students s2 ,circledb.registrations r where 1=1 and c.tutorId = t.tutorId and s.subjectId = c.subjectId and s2.studentId = r.studentId and r.courseId = c.courseId and c.courseName LIKE '%Molecular%'


truncate TABLE courses;
use circledb;

INSERT INTO circledb.courses
(courseName, startDate, endDate, status, subjectId, tutorId)
VALUES('Geography', '2024-01-01 05:00:00', '2024-01-01 08:00:00', 'Active', 4, 1);
INSERT INTO circledb.courses
(courseName, startDate, endDate, status, subjectId, tutorId)
VALUES('Geometry', '2024-01-01 06:00:00', '2024-01-01 08:00:00', 'InActive', 1, 1);
INSERT INTO circledb.courses
(courseName, startDate, endDate, status, subjectId, tutorId)
VALUES('Grammar', '2024-01-01 09:00:00', '2024-01-01 11:00:00', 'Active', 2, 1);
INSERT INTO circledb.courses
(courseName, startDate, endDate, status, subjectId, tutorId)
VALUES('Biology', '2024-01-01 02:00:00', '2024-01-01 08:00:00', 'Active', 3, 1);
INSERT INTO circledb.courses
(courseName, startDate, endDate, status, subjectId, tutorId)
VALUES('History', '2024-01-01 01:00:00', '2024-01-01 05:00:00', 'Active', 4, 2);
INSERT INTO circledb.courses
(courseName, startDate, endDate, status, subjectId, tutorId)
VALUES('Algebra', '2024-01-01 07:00:00', '2024-01-01 08:00:00', 'InActive', 1, 2);
INSERT INTO circledb.courses
(courseName, startDate, endDate, status, subjectId, tutorId)
VALUES('Lit', '2024-01-01 05:00:00', '2024-01-01 08:00:00', 'Active', 2, 2),
('Chemistry', '2024-01-01 01:00:00', '2024-01-01 02:00:00', 'Active', 3, 2);



INSERT INTO circledb.subjects
( subjectName)
VALUES('Socials');


INSERT INTO circledb.tutors
(tutorName, tutorEmail, tutorPhone, qualification, userId)
VALUES('Ramesh', 'Ramesh', '6376', 'MSc', 5);


select c.*
from circledb.courses c right outer join circledb.registrations r on c.courseId = r.courseId 

where r.studentId != 3