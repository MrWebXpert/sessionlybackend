const Course = require("../Models/Course.js");

exports.searchCourses = async (req, res) => {
    const { query } = req.query;
    try {
        const courses = await Course.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        });
        res.status(200).json({ success: true, data: courses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error searching courses', error: error.message });
    }
};
