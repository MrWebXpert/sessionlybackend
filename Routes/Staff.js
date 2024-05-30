const express = require('express');
const multer = require('multer');
const { userAuth } = require('../Middleware/userAuth');
const { register, getStaff, updateStaff, deleteStaff, resetPasswordEmail, resetPasswordToken, Staffs, getImage, changePassword, getExpertAvailability, addAvailability, sessionReview } = require('../Controller/Staff.js');
const { authorizeAdmin, authorizeStaff } = require('../Middleware/authorization.js');
const { getAllBookingsWithStudentNames } = require('../Controller/Admin.js');
const staffRouter = express.Router();
const storage = multer.memoryStorage()
const upload = multer({ storage })

staffRouter.post("/staff/register", upload.single("image"), register)
staffRouter.get("/staff/get/:id", getStaff)
staffRouter.patch("/staff/update/:id", upload.fields([{ name: 'video' }, { name: 'certificates' }]), updateStaff)
staffRouter.get("/staff/all", Staffs)
staffRouter.delete("/staff/delete/:id", deleteStaff)
staffRouter.post("/staff/reset-email", resetPasswordEmail)
staffRouter.post("/staff/reset-new-password/:id/:token", resetPasswordToken)
staffRouter.post("/staff/changepassword", userAuth, changePassword);
staffRouter.get("/image/:id", getImage);
staffRouter.post("/staff/review/:staffId", sessionReview)
// Route to get all booked courses with student names
staffRouter.get('/staff/bookings', getAllBookingsWithStudentNames);


staffRouter.get("/availability/:id", getExpertAvailability)
staffRouter.post("/addavailability", addAvailability)
module.exports = staffRouter