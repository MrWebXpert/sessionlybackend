const mongoose = require("mongoose")
const adminSchema = new mongoose.Schema({
   username: { type: String, required: true },
   email: { type: String, required: true },
   phone: { type: String, required: true },
   password: { type: String, required: true },
   userType: { type: String, enum: ["admin"], default: "admin" },
   Rating: { type: mongoose.Schema.Types.ObjectId, ref: "Rating" },
   image: { type: String },
   courses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
   }],
   CourseModule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CourseModule'
   },
   staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff'
   },
   students: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
   },
   chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat'
   },
   DiscussionPanel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DiscussionPanel'
   },
   tasks: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
   },
   CourseBooking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CourseBooking'
   }
})
const Admin = mongoose.model("Admin", adminSchema)
module.exports = Admin