const mongoose = require("mongoose");

// Define the schema for availability
const AvailabilitySchema = new mongoose.Schema({
  day: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

const staffSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  password: { type: String, required: true },
  // expertise: { type: String, required: true },
  Rating: { type: mongoose.Schema.Types.ObjectId, ref: "Rating" },
  //  Availability:{type: String, required: true},
  userType: { type: String, enum: ["staff"], default: "staff" },
  image: { type: String },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
  DiscussionPanel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DiscussionPanel",
  },
  Student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  courseBooking: { type: mongoose.Schema.Types.ObjectId, ref: "CourseBooking" },
  course: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  tasks: { type: mongoose.Schema.Types.ObjectId, ref: "Tasks" },
  availability: [AvailabilitySchema],
  sessionPrice: {
    type: String,
  },
  teacherType: {
    type: String,
  },
  languageofExpertise: {
    type: String,
  },
  introductionVideo: {
    type: Buffer,
  },
  videoMimetype: {
    type: String,
  },
  certificate: {
    type: Buffer,
  },
  certificateMimetype: {
    type: String,
  },
});
const Staff = mongoose.model("Staff", staffSchema);
module.exports = Staff;