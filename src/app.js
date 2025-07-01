const express = require("express");

const app = express();

// app.use("/route", rH1, rH2, rH3, rH4, rH5);
app.use(
    "/user",
    (req, res, next) => {
        console.log("Route handlers");
        // res.send("Response!!!");
        next();
    },
    (req, res, next) => {
        console.log("2nd route handlers!");
        // res.send("2nd Respose!!")
        next();
    },
    (req, res, next) => {
        console.log("3rd route handlers!");
        // res.send("3rd Respose!!")
        next();
    },
    (req, res, next) => {
        console.log("4th route handlers!");
        // res.send("4th Respose!!")
        next();
    }
);

// app.use("/route", [rH1, rH2, [rH3, rH4], rH5]);
app.use(
    "/user",
    (req, res, next) => {
        console.log("new route handlers!");
        // res.send("new Respose!!");
        next();
    },
    [
        (req, res, next) => {
            console.log("new 2nd route handlers!");
            // res.send("new 2nd Respose!!");
            next();
        },
        [
            (req, res, next) => {
                console.log("new 3rd route handlers!");
                // res.send("new 3rd Respose!!");
                next();
            },
            (req, res, next) => {
                console.log("new 4th route handlers!");
                // res.send("new 4th Respose!!");
                next();
            },
        ],
        (req, res, next) => {
            console.log("new 5th route handlers!");
            res.send("new 5th Respose!!");
            next();
        },
    ]
);
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
