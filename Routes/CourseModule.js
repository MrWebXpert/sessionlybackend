const express = require('express');
const courseModulesRouter = express.Router();
const multer = require('multer');
const { register, getCourseModule, updateCourseModule, CourseModules, dltCourseModule } = require('../Controller/CourseModules.js');
const { authorizeAdmin, authorizeStaff, authorizeStudent } = require('../Middleware/authorization.js');
const storage = multer.memoryStorage()
const upload = multer({storage})

courseModulesRouter.post("/module/register", upload.single("image"), register)
courseModulesRouter.get("/module/get/:id", getCourseModule)
courseModulesRouter.patch("/module/update/:id", updateCourseModule)
courseModulesRouter.get("/module/all", CourseModules)
courseModulesRouter.delete("/module/delete/:id", dltCourseModule)

module.exports = courseModulesRouter