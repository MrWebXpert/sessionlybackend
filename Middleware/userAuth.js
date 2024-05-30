const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization)
  try {
    if (!authorization || !authorization.startsWith("Bearer")) {
      return res.status(401).json({ message: "Unauthorized User" });
    }

    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Unauthorized User", error: err.message });
      }
      if (!user || !user.id) {
        return res
          .status(401)
          .json({ message: "Invalid Token: User ID not found" });
      }
      req.user = user;
      console.log(req.user);
      next();
    });
  } catch (error) {
    return res.status(401).json({
      message: "Authorization: Invalid Token",
      error: error.message,
    });
  }
};

module.exports = { userAuth };
