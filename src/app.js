const express = require('express');

const app = express();

app.use("/getUserData", (req, res, next) => {
    throw new Error("Bhooo I'm error");
    res.send("User data");
})

app.use("/", (err, req, res, next) => {
    if (err) {
        console.error(err.message);
        res.status(500).send("Something went wrong");
    }
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
});