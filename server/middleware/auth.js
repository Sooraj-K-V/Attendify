import { verifyToken } from "../auth.js";

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Bearer <token>
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Attach user info to the request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default authenticate;
