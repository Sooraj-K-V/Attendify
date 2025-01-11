import jwt from "jsonwebtoken";

const secretKey = "your_secret_key"; // Replace with an environment variable

// Generate a JWT
export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    secretKey,
    { expiresIn: "1h" }
  );
};

// Verify a JWT
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    throw new Error("Invalid token");
  }
};
