const Admin = require("../Models/Admin.js");
const Staff = require("../Models/Staff.js");
const Student = require("../Models/Student.js");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    console.log("Login Request Coming")
    try {
        if (!password || !email) {
            return res.status(402).json({ message: "All fields are required" });
        }

        let user = await Admin.findOne({ email });

        if (!user) {
            user = await Staff.findOne({ email });

            if (!user) {
                user = await Student.findOne({ email });

                if (!user) {
                    return res.status(401).json({ message: "Invalid email or password" });
                }
            }
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const id = user._id; 
        const token = jwt.sign(
            { email: user.email, id: user._id, userType: user.userType }, // Including userType in the token
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.cookie("token", token,  {
            httpOnly: true,
        });

        let redirectUrl;
        switch (user.userType) {
            case 'admin':
                redirectUrl = `/admin/${id}`; 
                break;
            case 'staff':
                redirectUrl = `/staff/${id}`; 
                break;
            case 'student':
                redirectUrl = `/student/${id}`; 
                break;
            default:
                return res.status(401).json({ message: "Invalid user type" });
        }

        // return res.status(201).json({ redirectUrl, token, id, userType: user.userType, type: user.type }); // Returning userType and user.type
          
        return res.status(201).json({ redirectUrl, token, id, userType: user.userType, profile: user.image, email: user.email }); // Returning userType
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

module.exports = login;
