const express = require("express");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");

const feedRouter = express.Router();

feedRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const users = await User.find({});
    if (!users.length) {
      return res.status(404).send("User not found");
    }
    res.send(users);
  } catch (error) {
    res.status(400).send("Something went wrong" + error.message);
  }
});

module.exports = feedRouter;
