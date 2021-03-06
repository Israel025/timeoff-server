const jwt = require("jsonwebtoken");
const env = require("../env");
/**
 *Auth middleware that checks if an authorization header exists in the rquest and if the token contained within is valid
 */
module.exports = function(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid login credentials Auth" });
    }

    const token = authHeader.split(" ")[1];

    const tokenData = jwt.verify(token, env.jwt_secret);

    req.user = tokenData.id;

    next();
  } catch (err) {
    return res.status(401).json({
      status: "error",
      data: err,
      message: "You are not authorized Auth"
    });
  }
};
