const mongoose = require('mongoose');

const courseModuleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    resources: [{
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ['video', 'document', 'link'], 
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    quizzes: [{
        title: {
            type: String,
            required: true
        },
        questions: [{
            question: {
                type: String,
                required: true
            },
            options: [{
                type: String,
                required: true
            }],
            correctOption: {
                type: Number,
                required: true
            }
        }]
    }],
    duration: {
        type: String
    },
    
});

const CourseModule = mongoose.model('CourseModule', courseModuleSchema);

module.exports = CourseModule;
