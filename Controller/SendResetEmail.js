const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Admin = require('../Models/Admin');
const Staff = require('../Models/Staff');
const Student = require('../Models/Student');
const bcrypt = require('bcrypt')
const { transport } = require('../Middleware/Nodemailer');

const JWT_SECRET = process.env.JWT_SECRET;


exports.changePasswordEmail = asyncHandler(async (req, res) => {
    const email = req.body.email;

    try {
        let user = await Admin.findOne({ email });

        if (!user) {
            user = await Staff.findOne({ email });
        }

        if (!user) {
            user = await Student.findOne({ email });
        }

        if (!user) {
            return res.status(404).json({ message: `${email} not found ` });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: '20min'
        });

        const resetLink = `http://localhost:3000/resetpassword/${user._id}/${token}`;
        const message = `Change your password using the provided link.This link will expire in 20 minutes: ${resetLink}`;

        const mail = {
            from: process.env.EMAIL_HOST,
            to: user.email,
            subject: 'Reset Password',
            html: `
            <p>Change your password using the provided link. This link will expire in 20 minutes:</p>
            <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">Reset Password</a>
            <p>If the button above doesn't work, copy and paste the following link into your browser:</p>
            <p>${resetLink}</p>
        `
        };

        transport.sendMail(mail, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: 'The email has not been sent', error: error.message });
            } else {
                console.log(info);
                res.send(`Reset Password link has been sent to email: ${resetLink}`);
            }
        });

    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});


exports.resetPasswordToken = asyncHandler(async (req, res) => {
    const { token, id } = req.params
    const newPassword = req.body.newPassword
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.id
        let user = await Admin.findById(id);

        if (!user) {
            user = await Staff.findById(id);
        }

        if (!user) {
            user = await Student.findById(id);
        }

        if (!user) {
            return res.status(404).json({ message: `${email} not found ` });
        }

        if (!user) {
            return res.status(404).json({ message: `Error, ${userType} not found to change the password ` });
        }
        const hashPassword = bcrypt.hashSync(newPassword, 10);
        user.password = hashPassword;
        await user.save();
        return res.status(201).json({ message: "Password has been changed successfully" });
    } catch (error) {
        return res.status(401).json({ message: "Failed Changing password", error: error.message });
    }
});