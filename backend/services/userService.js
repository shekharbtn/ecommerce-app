const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("../middleware/jwtValidation");

class UserServices {
  register = async ({ name, email, password }) => {
    try {
      if (!name && !email && !password) {
        throw {
          message: "All fields are required.",
          status: 400,
        };
      }
      const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!email.match(emailFormat)) {
        throw {
          message: "Invalid Email",
          status: 400,
        };
      }
      const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      if (!password.match(passw)) {
        throw {
          message: "Password criteria unmatched",
          status: 400,
        };
      }

      const findUser = await User.findOne({ email });
      if (findUser) {
        throw {
          message: "User already exist",
          status: 400,
        };
      }

      const hashPassword = await bcrypt.hash(password, 10);

      await User.create({
        name,
        email,
        password: hashPassword,
      });
      return {
        message: "User registered successfully",
        status: 201,
        error: false,
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status || 404,
        error: true,
      };
    }
  };

  login = async ({ email, password }) => {
    try {
      if (!email.length && !password.length) {
        throw {
          message: "Both email and password required",
          status: 400,
        };
      }

      const isEmail = await User.findOne({ email });
      if (!isEmail) {
        throw {
          message: "User not registered",
          status: 400,
        };
      }

      const isValidPassword = await bcrypt.compare(password, isEmail.password);
      if (!isValidPassword) {
        throw {
          message: "Incorrect Password",
          status: 400,
        };
      }
      const token = jwt.generateToken(isEmail._id);
      return {
        message: "User logged in successfully",
        status: 200,
        error: false,
        data: { token: token.data, name: isEmail.name },
      };
    } catch (error) {
      return {
        message: error.message,
        status: error.status || 400,
        error: true,
      };
    }
  };
}

module.exports = new UserServices();
