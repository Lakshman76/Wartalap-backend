const adminAuth = (req, res, next) => {
    console.log("Admin auth is checking");
    const token = "xyz";
    let isAuthorized = token === "xyz";
    if (!isAuthorized) {
        return res.status(401).send("Unauthorized");
    } else {
        next();
    }
}

const userAuth = (req, res, next) => {
    console.log("User auth is checking");
    const token = "xyz";
    let isAuthorized = token === "xyz";
    if (!isAuthorized) {
        return res.status(401).send("Unauthorized");
    } else {
        next();
    }
}

module.exports = { adminAuth, userAuth }