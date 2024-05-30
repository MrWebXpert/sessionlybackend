const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Admin = require("../Models/Admin.js");
const Staff = require("../Models/Staff.js");
const Student = require("../Models/Student.js");

exports.getUserType = asyncHandler(async (req, res) => {
    const token = req.cookies.token;

    try {
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { email, userType } = decoded;

        let user;
        switch (userType) {
            case "admin":
                user = await Admin.findOne({ email });
                break;
            case "staff":
                user = await Staff.findOne({ email });
                break;
            case "student":
                user = await Student.findOne({ email });
                break;
            default:
                return res.status(401).json({ message: "Invalid user type" });
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ userType: user.userType });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});
