const mongoose = require("mongoose");

const raitngSchema = new mongoose.Schema({
   rating:{
    type: String,
    required: true
   },
    tudent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to user
    Staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' }, // Reference to user
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }, // Reffer to user

})
const Rating = mongoose.model("Rating", raitngSchema)
module.exports = Rating