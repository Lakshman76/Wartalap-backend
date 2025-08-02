const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    res.send("User created successfully");
  } catch (error) {
    res.status(400).send("Failed to create user: " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.generateJwtToken();
      res.cookie("token", token);
      res.send("Login successfully!");
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(400).send("Failed to login user: " + error.message);
  }
});

module.exports = authRouter;
