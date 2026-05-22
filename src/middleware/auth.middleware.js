const { verifyToken } = require("../utils/jwt");

function authMiddleware(req, res, next) {
  try {
    const token =
      req.cookies.token ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = verifyToken(token);

    req.user = {
  _id: decoded.id || decoded._id,
  email: decoded.email
};

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = authMiddleware;