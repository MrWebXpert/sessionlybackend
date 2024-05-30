const express = require('express');
const courseBooking = express.Router();
const multer = require('multer');
const { authorizeAdmin, authorizeStaff, authorizeStudent } = require('../Middleware/authorization.js');
const { createCourseBooking, getAllCourseBookings, getCourseBookingById, updateCourseBooking, deleteCourseBooking, stripePayment } = require('../Controller/CourseBooking.js');


courseBooking.post("/booking/register", createCourseBooking)
courseBooking.get("/booking/all", getAllCourseBookings)
courseBooking.patch("/booking/update/:id", updateCourseBooking)
courseBooking.get("/booking/:id", getCourseBookingById)
courseBooking.delete("/booking/delete/:id", deleteCourseBooking)
courseBooking.post("/course/payment/:courseId", stripePayment)


module.exports = courseBooking