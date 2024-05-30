const Admin = require("../Models/Admin.js");
const CourseBooking = require("../Models/CoursBooking.js");
const Student = require("../Models/Student.js");
const { transport } = require("../Middleware/Nodemailer.js")
const nodemailer = require("nodemailer")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


exports.createCourseBooking = async (req, res) => {
    try {
        const courseBooking = await CourseBooking.create(req.body);
        await sendBookingNotificationEmail(courseBooking);
        res.status(201).json({ success: true, data: courseBooking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error creating course booking', error: error.message });
    }
};

const sendBookingNotificationEmail = async (courseBooking) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_HOST,
            to: "um416b@gmail.com",
            subject: 'New Course Booking',
            text: `A new course booking has been made. Course ID: ${courseBooking.course}, Student ID: ${courseBooking.student}`,
        };
        await transport.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email notification:', error);
    }
};

exports.getAllCourseBookings = async (req, res) => {
    try {
        const bookings = await CourseBooking.find();
        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error retrieving course bookings', error: error.message });
    }
};

exports.getCourseBookingById = async (req, res) => {
    try {
        const booking = await CourseBooking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Course booking not found' });
        }
        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error retrieving course booking', error: error.message });
    }
};

exports.updateCourseBooking = async (req, res) => {
    try {
        const booking = await CourseBooking.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Course booking not found' });
        }
        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error updating course booking', error: error.message });
    }
};

exports.deleteCourseBooking = async (req, res) => {
    try {
        const booking = await CourseBooking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Course booking not found' });
        }
        res.status(200).json({ success: true, message: 'Course booking deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error deleting course booking', error: error.message });
    }
};


exports.stripePayment = async (req, res) => {
    const { courseId } = req.params;
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method_types: ["card"],
        });

        res
            .status(200)
            .json({
                msg: "Payment successful",
                clientSecret: paymentIntent.client_secret,
            });
    } catch (error) {
        console.error("Error in Payment: ", error.message);
        res.status(500).json({ msg: "Payment failed", error: error.message });
    }
};