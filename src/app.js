require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const feedRouter = require("./routes/feed");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", feedRouter);


connectDB()
  .then(() => {
    console.log("Connected to database");
    app.listen(3000, () => {
      console.log("Listening on port 3000");
    });
  })
  .catch((err) => {
    console.log("Failed to connect to database", err);
  });
