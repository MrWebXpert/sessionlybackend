const mongoose = require('mongoose');

const discussionPanelSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'creator.userType',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    participants: [{
        userType: String, // Store the user type
        user: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'participants.userType'
        }
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'commentedBy.userType'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
   chat: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
     }],
});

const DiscussionPanel = mongoose.model('DiscussionPanel', discussionPanelSchema);

module.exports = DiscussionPanel;
