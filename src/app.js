require("dotenv").config();
const express = require('express');
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
    const userData = {
        firstName: "sachin",
        lastName: "tendulkar",
        emailId: "sachin@example.com",
        password: "sachin@123"
    }
    const user = new User(userData);
    try {
        await user.save();
        res.send("User created successfully");
    } catch (error) {
        res.send("Failed to create user", error.message);
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