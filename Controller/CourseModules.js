const CourseModule = require("../Models/CourseModule.js");
const File = require("../Models/ProfilePic.js");
const {v4: uuidv4} = require('uuid')
const asyncHandler = require("express-async-handler")


exports.register = asyncHandler(async (req, res) => {
    const { title, description, course, resources, quizzes, duration } = req.body;
    const file = req.file;
    try {
        const uploadImage = new File({ ...file });
        await uploadImage.save();
        const courseModuleId = uuidv4();

        const courseModule = new CourseModule({
            courseModuleId: courseModuleId,
            title,
            description,
            course,
            resources,
            quizzes,
            duration, 
            image: `http://localhost:5080/api/v2/image/${uploadImage._id}`,
            
        });

        const savedCourseModule = await courseModule.save();

        return res.status(202).json({
            message: "CourseModule registered successfully",
            result: savedCourseModule,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error registering the CourseModule", error: error.message });
    }
});
exports.getCourseModule = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    try {
        const verifyCourseModule = await CourseModule.findById(id);
        if (!verifyCourseModule) {
            return res.status(404).json({
                success: false,
                message: "CourseModule not found"
            });
        } else {
            return res.status(200).json({
                success: true,
                message: `CourseModule found: ${verifyCourseModule.title}`,
                data: verifyCourseModule
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error, White Creating CourseModule",
            error: error.message
        });
    }
});
exports.updateCourseModule = asyncHandler(async (req, res) => {
    const {id} = req.params
    const body = req.body
    try {
        const course = await CourseModule.findByIdAndUpdate(id, body, {new: true})
        if (!course) {
            return res.status(404).json({message: "CourseModule Not Found"})
        }
       
            return res.status(201).json({message: "CourseModule Is Updated Successfully"})
        
    } catch (error) {
        return res.status(401).json({message: "Failed to update CourseModule", error: error.message})
        
    }
})
exports.CourseModules = asyncHandler (async (req, res) => {
    try {
        const courseModule = await CourseModule.find()
        return res.status(200).json({
            message: "Course Module List",
            success: true,
            data: courseModule})
    } catch (error) {
        return res.status(401).json({message: error.message,
            success: false
        })

    }
})
exports.dltCourseModule = async (req, res) => {
    const { id } = req.params;
    try {
      const course = await CourseModule.findByIdAndDelete(id);
      if (!course) {
        return res.status(404).json({ message: "No CourseModule Found" });
      }
      return res
        .status(201)
        .json({ message: `Course Module with id: ${id} has been DELETED successfully` });
    } catch (error) {
      return res.status(500).json({ message: "Error, Please try again" });
    }
  };
exports.getImage = async (req, res) => {
    try {
      let { id } = req.params;
      let file = await File.findById(id);
      if (!file) {
        return res.status(404).json({ message: "No image available" });
      }
      res.setHeader("Content-Type", "image/jpeg");
  
      res.send(file.buffer);
    } catch (error) {
      return res.status(500).json({
        message: "An error occur while getting the user image",
        error: error,
      });
    }
  };
