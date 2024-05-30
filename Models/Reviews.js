const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema({
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    ratingText: {
      type: String,
      required: true
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff',
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  });

  const Review = mongoose.model('Review', ReviewSchema);

  module.exports = Review