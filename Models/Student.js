const mongoose = require("mongoose")
 const studentSchema = new mongoose.Schema({
    username: {type:String, required: true},
    email:{type:String, required: true},
    phone: {type: String, required: true},
    password:{type: String, required: true},
    userType: {type: String, enum:["student"], default: "student"},
    Rating:{type: mongoose.Schema.Types.ObjectId, ref: "Rating"},

    image: {type: String},
    chat:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat'
   },
   chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat'
   },
   CourseModule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CourseModule'
   },
   DiscussionPanel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DiscussionPanel'
   },
   courseBooking: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseBooking' }, // Reference to admin
   course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }, // Reference to course
   tasks: { type: mongoose.Schema.Types.ObjectId, ref: 'Tasks' },
 })
 const Student = mongoose.model("Student", studentSchema)
 module.exports = Student