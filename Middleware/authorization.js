const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.userType === 'admin') {
      next();
  } else {
      res.status(403).json({ message: 'Forbidden. Admin access required.' });
  }
};

const authorizeStaff = (req, res, next) => {
  if (req.user && req.user.userType === 'staff') {
      next();
  } else {
      res.status(403).json({ message: 'Forbidden. Staff access required.' });
  }
};

const authorizeStudent = (req, res, next) => {
  if (req.user && req.user.userType === 'student') {
      next();
  } else {
      res.status(403).json({ message: 'Forbidden. Student access required.' });
  }
};

module.exports = {
  authorizeAdmin,
  authorizeStaff,
  authorizeStudent
};
