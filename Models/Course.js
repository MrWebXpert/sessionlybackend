const mongoose = require('mongoose');


// Define the schema for a review
const ReviewSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    // description: {
    //     type: String,
    //     required: true
    // },
    // requirements: {
    //     type: String
    // },
    // preRequirements: {
    //     type: String
    // },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    staff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff'
    },
    students: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    duration: {
        type: String,
        required: true
    },
    sessionPrice: {
        type: String,
        required: true
    },
    // startDate: {
    //     type: Date,
    //     required: true
    // },
    // endDate: {
    //     type: Date,
    //     required: true
    // },
    // isActive: {
    //     type: Boolean,
    //     default: true
    // },
    // lastDateOfEnrollment: {
    //     type: Date
    // },
    category: {
        type: String
    },

    subCategory: {
        type: String
    },
    image: {
        type: String
    },
    calendar: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Calendar' }],
    review: [ReviewSchema],
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;