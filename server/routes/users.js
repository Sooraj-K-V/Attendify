import { Router } from "express";
import pool from "../db/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../auth.js";
import { body, validationResult } from "express-validator";

const router = Router();

router.post(
  "/register",
  [
    body("username").isLength({ min: 3 }).withMessage("Name is too short"),
    body("useremail").isEmail().withMessage("Invalid email"),
    body("userpassword").isLength({ min: 6 }).withMessage("Password too short"),
  ],
  async (req, res) => {
    try {
      const { username, useremail, userpassword, userrole } = req.body;
      const hashedPassword = await bcrypt.hash(userpassword, 10);
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [
        useremail,
      ]);
      const userExist = result.rowCount > 0;
      if (userExist === false) {
        const insert = await pool.query(
          "INSERT INTO users(name, email, role, password) VALUES($1, $2, $3, $4) RETURNING *",
          [username, useremail, userrole, hashedPassword]
        );
        res.json(`${username} has added to the list!`);
      } else {
        res.json({ error: "user already exist" });
      }
    } catch (err) {
      console.error(err.message);
      res.json({ error: err.message });
    }
  }
);

router.post("/login", async (req, res) => {
  const { useremail, userpassword } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      useremail,
    ]);
    if (result.rowCount === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];
    const validPassord = await bcrypt.compare(userpassword, user.password);
    if (!validPassord) {
      res.status(401).json({ error: "Invalid credentials" });
    }
    const token = generateToken(user);
    res.json({ message: "Login Successful", token });
  } catch (err) {
    console.error(err.message);
    res.json({ error: err.message });
  }
});

export default router;
