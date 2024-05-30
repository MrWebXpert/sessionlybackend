const Admin = require("../Models/Admin.js")
const { v4: uuidv4 } = require('uuid')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const File = require("../Models/ProfilePic.js")
const JWT_SECRET = process.env.JWT_SECRET
const { transport } = require("../Middleware/Nodemailer.js")
const Staff = require("../Models/Staff.js")
const Student = require("../Models/Student.js")
const CourseBooking = require("../Models/CoursBooking.js")

exports.register = asyncHandler(async (req, res) => {
    const { username, email, password, phone } = req.body;
    const file = req.file;

    console.log("Request Coming")
    try {
        const adminExists = await Admin.findOne({ email });
        const studentExists = await Student.findOne({ email });
        const staffExists = await Staff.findOne({ email });

        if (adminExists || staffExists || studentExists) {
            return res.status(403).json({ message: "Email already exists" });
        }

        const uploadImage = new File({ ...file });
        await uploadImage.save();

        const hash = await bcrypt.hash(password, 10);
        const userId = uuidv4();

        const user = new Admin({
            userId: userId,
            username: username,
            email: email,
            password: hash,
            phone: phone,
            image: `http://localhost:5080/api/v2/image/${uploadImage._id}`,
        });

        const savedUser = await user.save();

        // Send email with credentials
        const message = `Welcome ${username}!\n\nYour account has been successfully registered.\n\nUsername: ${username}\nEmail: ${email}\nPassword: ${password}\n\nPlease log in to your account and change your password immediately for security reasons.`;

        const mailOptions = {
            from: process.env.EMAIL_HOST,
            to: email,
            subject: "Account Registered Successfully",
            text: message
        };

        transport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Error sending email", error: error.message });
            } else {
                console.log("Email sent: " + info.response);
                return res.status(202).json({
                    message: "User registered successfully. Email sent with credentials.",
                    result: savedUser,
                    success: true
                });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error registering the user", error: error.message });
    }
});
exports.getAdmin = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    try {
        const verifyAdmin = await Admin.findById(id)
        if (!verifyAdmin) {
            return res.status(403).json({
                message: "Admin not Found",
                success: false
            })
        } else {
            return res.status(200).json({
                message: `user ${verifyAdmin.username}`,
                success: true,
                verifyAdmin
            })
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        })
    }
})
exports.updateAdmin = asyncHandler(async (req, res) => {
    const { id } = req.params
    const body = req.body
    try {
        const user = await Admin.findByIdAndUpdate(id, body, { new: true })
        if (!user) {
            return res.status(404).json({ message: "Admin Not Found" })
        }

        return res.status(201).json({ message: "Admin Is Updated Successfully" })

    } catch (error) {
        return res.status(401).json({ message: "Failed to update Admin", error: error.message })

    }
})
exports.admins = asyncHandler(async (req, res) => {
    try {
        const users = await Admin.find()
        return res.status(200).json({
            message: "users List",
            success: true,
            data: users
        })
    } catch (error) {
        return res.status(401).json({
            message: error.message,
            success: false
        })

    }
})
exports.deleteAdmin = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const user = await Admin.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).json({ message: "Admin Not Found" })
        }
        else {
            return res.status(201).json({ message: `Admin ${user.username} has been deleted successfully` })
        }
    } catch (error) {
        return res.status(401).json({ message: "Problem occured while deleting admin", error: error.message });
    }
})
exports.resetPasswordEmail = asyncHandler(async (req, res) => {
    const email = req.body.email

    try {
        const user = await Admin.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: `${user.email} not found` });
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: "20min"
        })
        // const resetLink = `http://localhost:5080/api/v2//admin/reset-new-password/${user._id}/${token}`
        resetLink = `http://localhost:3000/resetpassword/${user._id}/${token}`
        const message = `Change your password using the provided link, This link will expire in 20 minutes ${resetLink}`
        let mail = {
            from: process.env.EMAIL_HOST,
            to: user.email,
            subject: "Reset Password",
            text: message
        }
        transport.sendMail(mail, function (error, info) {
            if (error) console.log(error)
            else console.log(info)
        })
        res.send(`Reset Password link has been sent to email: ${resetLink}`)
    } catch (error) {
        return res.status(500).json({ message: "The email has not been sent", error: error.message })
    }
})
exports.resetPasswordToken = asyncHandler(async (req, res) => {
    const { token, id } = req.params
    const newPassword = req.body.newPassword
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.id
        const user = await Admin.findOne(userId)
        req.user = user
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: "Error, User not found to change the password" })
        }
        const hashPassword = bcrypt.hashSync(newPassword, 10)
        user.password = hashPassword
        await user.save()
        return res.status(201).json({ message: "Password has been changed successfully" })
    } catch (error) {
        return res.status(401).json({ message: "Failed Changing password", error: error.message })
    }
})
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
exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({ message: "All fields required" });
    }

    if (newPassword !== confirmPassword) {
        return res.status(403).json({ message: "Passwords didn't match" });
    }

    try {
        const userId = req.user.id;

        const user = await Admin.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const verifyPassword = await bcrypt.compare(oldPassword, user.password);

        if (!verifyPassword) {
            return res.status(400).json({ message: "Invalid old password" });
        }

        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        await Admin.findByIdAndUpdate(userId, {
            $set: { password: newHashedPassword },
        });

        return res.json({ message: "Password updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controller to get all booked courses with student names
exports.getAllBookingsWithStudentNames = async (req, res) => {
    try {
        const bookings = await CourseBooking.find().populate('course').populate('student');
        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching all bookings', error: error.message });
    }
};