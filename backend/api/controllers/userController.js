const userServices = require("../../services/userService");

class UserController {
  register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const userRes = await userServices.register({ name, email, password });
      if (!userRes) {
        throw {
          message: "userRes error",
          status: 400,
        };
      }
      return res.status(userRes.status).send({
        message: userRes.message,
        error: userRes.error,
      });
    } catch (error) {
      return res.status(error.status || 400).send({
        message: error.message,
        error: error.error || true,
      });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const userRes = await userServices.login({ email, password });
      if (!userRes) throw userRes.error;
      return res.status(userRes.status).send({
        message: userRes.message,
        error: userRes.error,
        data: userRes.data,
      });
    } catch (error) {
      return res.status(error.status || 400).send({
        message: error.message,
        error: error.error || true,
      });
    }
  };
}

module.exports = new UserController();
