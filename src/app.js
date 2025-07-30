require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User created successfully");
    } catch (error) {
        res.status(400).send("Failed to create user: " + error.message);
    }
});

app.get("/user", async (req, res) => {
    try {
        const user = await User.findById(req.body);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.send(user);
    } catch (error) {
        res.status(400).send("Something went wrong" + error.message);
    }
});

app.get("/feed", async (req, res) => {
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

app.delete("/user", async (req, res) => {
    const userId = req.body.id;
    try {
        // await User.findByIdAndDelete({ _id: userId });  // OR
        await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch (error) {
        res.status(400).send("Failed to delete user: " + error.message);
    }
});

app.patch("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    const UPDATE_ALLOWED = ["password", "age", "gender", "about", "skills"];
    const isUpdateAllowed = Object.keys(data).every((key) =>
      UPDATE_ALLOWED.includes(key)
    );
    if (!isUpdateAllowed) {
      throw new Error("Updation not allowed");
    }
    const userBeforeUpdate = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "before",
      runValidators: true,
    });
    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("Failed to update user: " + error.message);
  }
});

app.patch("/newUser", async (req, res) => {
  try {
    const email = req.body.email;
    const data = req.body;
    await User.findOneAndUpdate({ email: email }, data);
    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

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
