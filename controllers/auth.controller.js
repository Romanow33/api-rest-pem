import { User } from "../models/user.js";
import { generateToken } from "../utils/tokenManager.js";

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
    const { token, expireIn } = generateToken(user.id);

    //Finally response
    return res.json({ token, expireIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean();
    if (!user) throw new Error("User not found");
    return res.json({ email: user.email, uid: user.id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
