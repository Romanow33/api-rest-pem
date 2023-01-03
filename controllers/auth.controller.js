import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user) throw { code: 11000 };
    user = new User({ email, password });
    await user.save();
    return res.status(201).json({ ok: "Register succesefull" });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res.status(400).json({ error: "Ya existe este usuario" });
    }
    return res.status(500).json({ error: error });
  }
};

export const login = async (req, res) => {
  try {
    //Validation of user credentials
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) return res.status(403).json({ error: "User not found" });
    const comparePassRes = await user.comparePassword(password);
    if (!comparePassRes)
      return res.status(403).json({ error: "Incorrect credentials" });

    //Generating token
    const token = jwt.sign({ uid: user.id }, process.env.JWT_SECRET);
    if (!token) return res.status(403).json({ error: "Error token generator" });

    //Finally response
    return res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};
