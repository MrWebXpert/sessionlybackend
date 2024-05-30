const mongoose = require('mongoose');

const screenShareSchema = new mongoose.Schema({
    roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
    },
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ['Student', ' Admin', 'Staff'],
    required: true
    },
    screenShareStatus: {
    type: String,
    enum: ['active', 'ended'],
    default: 'active'
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
    
    const ScreenShare = mongoose.model('ScreenShare', screenShareSchema);
    
    module.exports = ScreenShare