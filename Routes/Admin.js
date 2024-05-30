const express = require('express');
const { register, getAdmin, updateAdmin, admins, deleteAdmin, resetPasswordEmail, getImage, resetPasswordToken, changePassword, getAllBookingsWithStudentNames } = require('../Controller/Admin.js');
const multer = require('multer');
const { userAuth } = require('../Middleware/userAuth.js');
const { authorizeAdmin } = require('../Middleware/authorization.js');
const adminRouter = express.Router();
const storage = multer.memoryStorage()
const upload = multer({ storage })

adminRouter.post("/admin/register", upload.single("image"), register)
adminRouter.get("/admin/get/:id", getAdmin)
adminRouter.patch("/admin/update/:id", updateAdmin)
adminRouter.get("/admin/all", admins)
adminRouter.delete("/admin/delete/:id", deleteAdmin)
adminRouter.post("/admin/reset-email", resetPasswordEmail)
adminRouter.post("/admin/reset-new-password/:id/:token", resetPasswordToken)
adminRouter.post("/admin/changepassword", userAuth, changePassword);
adminRouter.get("/image/:id", getImage);
// Route to get all booked courses with student names
adminRouter.get('/admin/bookings', getAllBookingsWithStudentNames);
module.exports = adminRouter