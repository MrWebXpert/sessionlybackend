const mongoose = require('mongoose');
const fileShareSchema = new mongoose.Schema({
    roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
    },
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },
    fileName: {
    type: String,
    trim: true,
    maxlength: 100
    },
    fileType: {
    type: String,
    trim: true,
    maxlength: 50
    },
    fileSize: {
    type: Number
    },
    createdAt: {
    type: Date,
    default: Date.now
    }
    });
    
    const FileShare = mongoose.model('FileShare', fileShareSchema);
    module.exports = FileShare