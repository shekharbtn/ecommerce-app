require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 4003;

const connect = require("../backend/config/dbConnect");
connect();

app.listen(PORT, () => {
  console.log(`Server is runnig on ${PORT}...`);
});
