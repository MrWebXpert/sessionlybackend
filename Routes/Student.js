const express = require('express');
const multer = require('multer');
const { userAuth } = require('../Middleware/userAuth.js');
const { register, updateStudent, Students, deleteStudent, resetPasswordEmail, resetPasswordToken, getImage, getStudent, changePassword, getBookedCoursesForStudent } = require('../Controller/Student.js');
const { authorizeAdmin, authorizeStaff, authorizeStudent } = require('../Middleware/authorization.js');
const studentRouter = express.Router();
const storage = multer.memoryStorage()
const upload = multer({ storage })

studentRouter.post("/student/register", upload.single("image"), register)
studentRouter.get("/student/get/:id", userAuth, getStudent)
studentRouter.patch("/student/update/:id", updateStudent)
studentRouter.get("/student/all", Students)
studentRouter.delete("/student/delete/:id", deleteStudent)
studentRouter.post("/student/reset-email", resetPasswordEmail)
studentRouter.post("/student/reset-new-password/:id/:token", resetPasswordToken)
studentRouter.post("/student/changepassword", userAuth, changePassword);
studentRouter.get("/image/:id", getImage);
// Route to get booked courses for a student
studentRouter.get('/bookedcourse/:studentId', getBookedCoursesForStudent);

module.exports = studentRouter