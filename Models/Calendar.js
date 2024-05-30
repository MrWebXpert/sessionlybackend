// models/CalendarEvent.js
const mongoose = require('mongoose');

const calendarEventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    Student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to user
    Staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' }, // Reference to user
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }, // Reference to admin
    courseBooking: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseBooking' }, // Reference to admin
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }, // Reference to course
    tasks: { type: mongoose.Schema.Types.ObjectId, ref: 'Tasks' },
});

const Calendar = mongoose.model('Calendar', calendarEventSchema);

module.exports = Calendar;
