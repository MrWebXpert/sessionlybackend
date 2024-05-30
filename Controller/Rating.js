const Admin = require("../Models/Admin");
const Rating = require("../Models/Rating");
const Staff = require("../Models/Staff");
const Student = require("../Models/Student");

exports.create = async (req, res) => {
    try {
      const { rating, studentId } = req.params;
      const { staffId, adminId } = req.params;
  
      // Check if rating is between 1 and 5
      if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5' });
      }
  
      // Check if either staffId or adminId is provided
      if (!(staffId || adminId)) {
        return res.status(400).json({ error: 'Staff or Admin ID is required' });
      }
  
      // Find student based on the provided ID
      const student = await Student.findById(studentId);
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      // Find staff or admin based on the provided ID
      const staff = staffId ? await Staff.findById(staffId) : null;
      const admin = adminId ? await Admin.findById(adminId) : null;
  
      // Check if staff or admin is found
      if (!staff && !admin) {
        return res.status(404).json({ error: 'Staff or Admin not found' });
      }
  
      // Create a new rating
      const newRating = new Rating({ rating, student: studentId, staff, admin });
      await newRating.save();
  
      // Push the new rating into the ratings array of staff or admin
      if (staff) {
        staff.Rating.push(newRating);
        await staff.save();
      } else {
        admin.Rating.push(newRating);
        await admin.save();
      }
  
      // Return the newly created rating
      res.status(201).json(newRating);
    } catch (err) {
      // Handle server error
      console.error(err);
      res.status(500).json({ error: 'Failed to create rating' });
    }
  };
  
  