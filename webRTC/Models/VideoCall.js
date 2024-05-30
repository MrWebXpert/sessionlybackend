const mongoose = require('mongoose');
const videoCallSchema = new mongoose.Schema({
    roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
    },
    callerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },
    calleeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },
    callStatus: {
    type: String,
    enum: ['ringing', 'answered', 'ended'],
    default: 'ringing'
    },
    createdAt: {
    type: Date,
    default: Date.now
    },
    updatedAt: {
    type: Date,
    default: Date.now
    }
    });
    
    const VideoCall = mongoose.model('VideoCall', videoCallSchema);
    module.exports = VideoCall