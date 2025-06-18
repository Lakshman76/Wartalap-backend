const express = require('express');

const app = express()

app.get("/", (req, res) => {
    res.send("Hello world");
})

app.get("/test", (req, res) => {
    res.send("Hello from test route");
})

app.get("/hello", (req, res) => {
    res.send("Hello from hello route");
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
});