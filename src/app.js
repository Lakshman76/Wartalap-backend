const express = require('express');
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

app.use("/admin", adminAuth)

app.use("/user", userAuth, (req, res, next) => {
    res.send("User data");
})

app.get("/admin/getAllUsers", (req, res, next) => {
    res.send("Get all users data");
})

app.get("/admin/deleteUser", (req, res, next) => {
    res.send("Delete user data");
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
});