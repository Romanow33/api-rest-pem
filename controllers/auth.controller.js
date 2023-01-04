import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user) throw { code: 11000 };
    user = new User({ email, password });
    await user.save();
    return res.status(201).json({ ok: "Register succesefull" });
  } catch (error) {
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
    generateRefreshToken(user.id, res);
    //Finally response
    return res.json({ token, expireIn });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean();
    if (!user) throw new Error("User not found");
    return res.json({ email: user.email, uid: user.id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const refreshToken = (req, res) => {
  try {
    const refreshTokeCookie = req.cookies.refreshToken;
    if (!refreshTokeCookie) throw new Error("No token");
    const { uid } = jwt.verify(refreshTokeCookie, process.env.JWT_REFRESH);
    const { token, expireIn } = generateToken(uid);
    return res.json({ token, expireIn });
  } catch (error) {
    const TokenVerificationErrors = {
      "invalid signature": "Token signature wrong",
      "jwt expired": "JWT expired",
      "invalid token": "Invalid Token",
      "No bearer": "Token format invalid",
      "jwt malformed": "JWT invalid format",
    };
    return res
      .status(401)
      .send({ error: TokenVerificationErrors[error.message] });
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ ok: "true" });
};
