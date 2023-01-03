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

//its a short time token, save in cookies, only 15minutes of token life
