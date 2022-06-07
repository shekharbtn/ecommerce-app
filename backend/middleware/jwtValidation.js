const jwt = require("jsonwebtoken");

class JwtValidation {
  generateToken = (userId) => {
    try {
      if (!userId) {
        throw {
          message: "UserId missing",
          status: 400,
        };
      }
      const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
        expiresIn: "10h",
      });

      return {
        message: "Token generated successfully",
        status: 200,
        error: false,
        data: token,
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status || 400,
        error: true,
      };
    }
  };

  validateToken = (req, res, next) => {
    try {
      const token = req.headers["authorization"];
      let data = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = data.user_Id;
      next();
    } catch (error) {
      return {
        message: error.message,
        status: error.status || 400,
        error: true,
      };
    }
  };
}

module.exports = new JwtValidation();
