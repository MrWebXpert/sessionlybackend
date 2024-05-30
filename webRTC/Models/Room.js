const mongoose = require('mongoose');
const roomSchema = new mongoose.Schema({
    Admin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    Staff: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
    Students: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    name: { type: String, required: true, trim: true, minlength: 3, maxlength: 50 },
    description: { type: String, trim: true, maxlength: 200 },
    roomKey: { type: String, required: true, unique: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: ["Admin", "Staff", "Student"] }], // Add this line
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
    const Room = mongoose.model('Room', roomSchema);
    
module.exports = Room;