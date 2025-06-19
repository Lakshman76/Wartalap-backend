const express = require('express');

const app = express()

app.get("/user", (req, res) => {
    res.send({ firstName: "Lakshman", lastName: "Kumar" });
})

app.post("/user", (req, res) => {
    console.log("Data saved successfully");
    res.send("Data saved successfully to the database");
})

app.delete("/user", (req, res) => {
    res.send("Data deleted successfully from the database");
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
});