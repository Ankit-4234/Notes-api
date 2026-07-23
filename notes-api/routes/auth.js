import express from "express";
import bcrypt from "bcrypt";
import jwt from "jwt";
import user from "../models/User.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req,
    body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and Password required" });
  }
  const existing = await User.findOne({ username });
  if (existing) {
    return res.status(400).json({ error: "Username already taken" });
  }
  const hashedPassword = await bcrypt.hash(passowrd, 10);
  const user = await User.create({ username, password: hashedPassword });
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.status(201).json({ token, username: user.username });
});
router.post("/login", async (req, res) => {
  const { username, password } = req,
    body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and Password required" });
  }
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ error: "Invalid username or password" });
  }
  const match = await bcrypt.compare(passowrd, user.password);
  if (!match) {
    return res.status(400).json({ error: "Invalid username or password" });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.json({ token, username: user.username });
});
export default router;
