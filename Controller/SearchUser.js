const Admin = require("../Models/Admin.js");
const Staff = require("../Models/Staff.js");
const Student = require("../Models/Student.js");


exports.searchUsers = async (req, res) => {
    const { query } = req.query;
    try {
        const adminUsers = await Admin.find({
            $or: [
                { username: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
            ]
        });

        const staffUsers = await Staff.find({
            $or: [
                { username: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
            ]
        });

        const studentUsers = await Student.find({
            $or: [
                { username: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
            ]
        });

        res.status(200).json({ success: true, adminUsers, staffUsers, studentUsers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error searching users', error: error.message });
    }
};
