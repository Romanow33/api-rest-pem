import jwt from "jsonwebtoken";

export const requireToken = (req, res, next) => {
  //verify Token
  try {
    let token = req.headers?.authorization;
    if (!token) throw new Error("No bearer");
    token = token.split(" ")[1];
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    next();
  } catch (error) {
    const TokenVerificationErrors = {
      "invalid signature": "Token signature wrong",
      "jwt expired": "JWT expired",
      "invalid token": "Invalid Token",
      "No bearer": "Token format invalid",
    };

    return res
      .status(401)
      .send({ error: TokenVerificationErrors[error.message] });
  }
};
