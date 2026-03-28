// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   try {
//     const token = req.headers.authorization;

//     if (!token) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.userId = decoded.userId;

//     next();

//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 🔥 FIX: Map 'userId' from the token to 'req.user.id' 
    // This matches what your routes (like /settings) are looking for
    req.user = {
      id: decoded.userId || decoded.id || (decoded.user ? decoded.user.id : null)
    };

    if (!req.user.id) {
      return res.status(401).json({ msg: 'Token valid but User ID missing' });
    }

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};