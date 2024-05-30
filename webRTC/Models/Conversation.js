const mongoose  = require("mongoose");

mongoose
const conversationSchema = new mongoose.Schema({
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
    message: {
    type: String,
    trim: true,
    maxlength: 500
    },
    createdAt: {
    type: Date,
    default: Date.now
    }
    });
    
    const Conversation = mongoose.model('Conversation', conversationSchema);
    module.exports = Conversation
    