const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log(`Database conected successfully`);
    })
    .catch((error) => {
      console.log(`Database connection error ${error}`);
    });
};

module.exports = connect;
