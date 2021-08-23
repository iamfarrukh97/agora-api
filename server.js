const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./.env" });

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: false,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"));

app.listen(3000, () => console.log("Server up on port 3000"));
