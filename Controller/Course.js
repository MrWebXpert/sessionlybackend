const File = require("../Models/ProfilePic.js");
const Course = require("../Models/Course.js");
const { v4: uuidv4 } = require('uuid')
const asyncHandler = require("express-async-handler");
const Admin = require("../Models/Admin.js");
const Staff = require("../Models/Staff.js");
const Calendar = require("../Models/Calendar.js");



// exports.createCourse = asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const { title, duration, sessionPrice, category, subCategory, image } = req.body;

//     const isAdmin = await Admin.findById(id);
//     const isStaff = await Staff.findById(id);

//     if (!isAdmin && !isStaff) {
//         return res.status(403).json({ message: 'Only admins and staff can create courses' });
//     }

//     const course = new Course({
//         title,
//         duration,
//         image,
//         category,
//         subCategory,
//         sessionPrice
//     });

//     if (isAdmin) {
//         course.admin = id;
//         isAdmin.courses = isAdmin.courses || [];
//         isAdmin.courses.push(course._id);
//         await isAdmin.save();
//     } else if (isStaff) {
//         course.staff = id;
//         isStaff.course = isStaff.course || [];
//         isStaff.course.push(course._id);
//         await isStaff.save();
//     }

//     await course.save();

//     res.status(201).json({ message: 'Course created successfully', course });
// });
exports.createCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, duration, sessionPrice, category, subCategory, description } = req.body;
    const file = req.file;

    const isAdmin = await Admin.findById(id);
    const isStaff = await Staff.findById(id);

    if (!isAdmin && !isStaff) {
        return res.status(403).json({ message: 'Only admins and staff can create courses' });
    }
    const uploadImage = new File({ ...file });
    await uploadImage.save();

    const course = new Course({
        title,
        description,
        duration,
        category,
        subCategory,
        sessionPrice,
        image: `http://localhost:5080/api/v2/image/${uploadImage._id}`,
    });

    if (isAdmin) {
        course.admin = id;
        isAdmin.courses = isAdmin.courses || [];
        isAdmin.courses.push(course._id);
        await isAdmin.save();
    } else if (isStaff) {
        course.staff = id;
        isStaff.course = isStaff.course || [];
        isStaff.course.push(course._id);
        await isStaff.save();
    }

    await course.save();

    res.status(201).json({ message: 'Course created successfully', course });
});

exports.getCourse = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    try {
        const verifyCourse = await Course.findById(id);
        if (!verifyCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        } else {
            return res.status(200).json({
                success: true,
                message: `Course found: ${verifyCourse.title}`,
                verifyCourse
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});
exports.updateCourse = asyncHandler(async (req, res) => {
    const { id } = req.params
    const body = req.body;
    try {
        const course = await Course.findByIdAndUpdate(id, body, { new: true })
        if (!course) {
            return res.status(404).json({ message: "Course Not Found" })
        }

        return res.status(201).json({ message: "Course Is Updated Successfully", course })

    } catch (error) {
        return res.status(401).json({ message: "Failed to update Course", error: error.message })

    }
})
exports.Courses = asyncHandler(async (req, res) => {
    try {
        const courses = await Course.find()
        return res.status(200).json({
            message: "Course List",
            success: true,
            data: courses
        })
    } catch (error) {
        return res.status(401).json({
            message: error.message,
            success: false
        })

    }
})
exports.dltCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findByIdAndDelete(id);
        if (!course) {
            return res.status(404).json({ message: "No Course Found" });
        }
        return res
            .status(201)
            .json({ message: ` Course with id: ${id} has been DELETED successfully` });
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

exports.addReview = async (req, res) => {
    const { courseId, studentId, rating, comment } = req.body;

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        const newReview = { student: studentId, rating, comment };
        course.review.push(newReview);
        await course.save();

        return res.status(200).json({ success: true, data: course });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error adding review', error: error.message });
    }
};