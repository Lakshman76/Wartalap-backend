require("dotenv").config();
const express = require('express');
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
        res.send("Failed to create user", error.message);
    }
})

app.get("/user", async (req, res) => {
    try {
        const user = await User.findById(req.body);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.send(user);
    } catch (error) {
        res.status(400).send("Something went wrong");
    }
})

app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        if (!users.length) {
            return res.status(404).send("User not found");
        }
        res.send(users);
    } catch (error) {
        res.status(400).send("Something went wrong");
    }
})

app.delete("/user", async (req, res) => {
    const userId = req.body.id;
    try {
        // await User.findByIdAndDelete({ _id: userId });  // OR
        await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch (error) {
        res.status(400).send("Something went wrong");
    }
})

connectDB().then(() => {
    console.log("Connected to database");
    app.listen(3000, () => {
        console.log("Listening on port 3000");
    });
}).catch((err) => {
    console.log("Failed to connect to database", err);
});