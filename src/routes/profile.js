const express = require("express");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const { isUpdateAllowed } = require("../utils/validation");

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

module.exports = profileRouter;
