import jwt from "jsonwebtoken";

export const generateToken = (uid) => {
  const expireIn = 60 * 15;
  try {
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, {
      expiresIn: expireIn,
    });
    return { token, expireIn };
  } catch (error) {
    console.log(error);
  }
};

export const generateRefreshToken = (uid, res) => {
  const expiresIn = 60 * 60 * 24 * 30;
  try {
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
      expiresIn,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: !(process.env.MODO === "developer"),
      expires: new Date(Date.now + expiresIn) * 1000,
    });
  } catch (error) {
    console.log(error);
  }
};
//its a short time token, save in cookies, only 15minutes of token life

export const tokenVerificationErrors = {
  "invalid signature": "Token signature wrong",
  "jwt expired": "JWT expired",
  "invalid token": "Invalid Token",
  "No bearer": "Token format invalid",
  "jwt malformed": "JWT invalid format",
};
