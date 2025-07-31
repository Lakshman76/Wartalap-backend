require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "7d",
      });
      res.cookie("token", token);
      res.send("Login successfully!");
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(400).send("Failed to login user: " + error.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const cookie = req.cookies;
    const { token } = cookie;
    if (!token) {
      throw new Error("Invalid token");
    }
    const data = jwt.verify(token, process.env.SECRET_KEY);
    const { _id } = data;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    res.send(user);
  } catch (error) {
    res.status(400).send("Failed to fetch user profile: " + error.message);
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
