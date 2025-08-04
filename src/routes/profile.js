const express = require("express");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const { isUpdateAllowed } = require("../utils/validation");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user);
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const data = req.body;
    if (!isUpdateAllowed(data)) {
      throw new Error("Invalid data");
    }
    const { _id } = req.user;
    const updatedUser = await User.findByIdAndUpdate(_id, data, {
      runValidators: true,
      returnDocument: "after",
    });
    res.json({ message: "User updated Successfully", data: updatedUser });
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const user = req.user;
    const isPasswordvalid = await user.validatePassword(password);
    if (!isPasswordvalid) {
      throw new Error("Invalid password");
    }
    const passwordHash = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(
      user._id,
      {
        password: passwordHash,
      },
      {
        runValidators: true,
      }
    );
    res.send("Password updated Successfully");
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

module.exports = profileRouter;
