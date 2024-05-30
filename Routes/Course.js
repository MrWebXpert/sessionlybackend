const express = require('express');
const courseRouter = express.Router();
const multer = require('multer');
const { register, getCourse, updateCourse, Courses, deleteCourse, dltCourse, createCourse, addReview } = require('../Controller/Course.js');
const { authorizeAdmin, authorizeStaff, authorizeStudent } = require('../Middleware/authorization.js');
const storage = multer.memoryStorage()
const upload = multer({ storage })

courseRouter.post("/course/register/:id", upload.single("image"), createCourse)
courseRouter.get("/course/get/:id", getCourse)
courseRouter.patch("/course/update/:id", updateCourse)
courseRouter.get("/course/all", Courses)
courseRouter.delete("/course/delete/:id", dltCourse)
courseRouter.post('/courses/:courseId/reviews', addReview);

module.exports = courseRouter