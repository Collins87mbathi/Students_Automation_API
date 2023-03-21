const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");


dotenv.config();

class Auth {
  static Required = async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      if (!authorization)
        res.status(401).json("Authorization is required")
      const token = authorization.split(" ")[1];
      if (!token)
        return console.log("token is required");
      jwt.verify(token, "elie", (err, user) => {
        if (err) return res.status(402).json("invalid token");
        req.user = user;
        next();
      });
    } catch (error) {
      
        console.log(error)
      
    }
  };
}

module.exports = {
  Required: Auth.Required,
};
