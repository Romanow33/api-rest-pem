import { tokenVerificationErrors } from "../utils/tokenManager.js";
import jwt from "jsonwebtoken";

export const requireRefreshToken = (req, res, next) => {
  try {
    const refreshTokeCookie = req.cookies.refreshToken;
    if (!refreshTokeCookie) throw new Error("No token");
    const { uid } = jwt.verify(refreshTokeCookie, process.env.JWT_REFRESH);
    req.uid = uid;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: tokenVerificationErrors[error.message] });
  }
};
