const mongoose = require('mongoose');

const courseBookingSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    Student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }, // Reference to admin
    staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' }, // Reference to staff


});

const CourseBooking = mongoose.model('CourseBooking', courseBookingSchema);

module.exports = CourseBooking;
