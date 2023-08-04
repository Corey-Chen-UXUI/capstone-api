const express = require("express");
const app = express();
const PORT = process.env.PORT || 5050;
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cors = require("cors");

app.use(cors());
//parse JSON in requests
app.use(express.json());

//server static file
app.use(express.static("public"));

function authorize(req, res, next) {
    // STEP 2: Logic for getting the token and
    // decoding the contents of the token. The
    // decoded contents should be placed on req.decoded
    // If the token is not provided, or invalid, then
    // this function should not continue on to the
    // end-point and respond with an error status code.
    if (!req.headers.authorization) {
        return res.status(401).send("Please login");
    }

    // Parse the bearer token
    const authHeader = req.headers.authorization;
    const authToken = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(authToken, "627848b66b923157eef378460959354b1552082dab849986481956b0444077ef");

    req.decoded = decoded;
    console.log(req);
    next();
}

const users = {};

app.post("/signup", (req, res) => {
    const { username, name, password } = req.body;
    users[username] = {
        name,
        password, // NOTE: Passwords should NEVER be stored in the clear like this. Use a
        // library like bcrypt to Hash the password. For demo purposes only.
    };
    res.json({ success: "true" });
});

// A Basic Login end point
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users[username];
    console.log(username, password);
    if (user && user.password === password) {
        // STEP 1: When a user provides a correct username/password,
        // the user can be considered authenticated.
        // Create a JWT token for the user, and add their name to
        // the token. Send the token back to the client.
        const token = jwt.sign(
            { username: username, password: password },
            "627848b66b923157eef378460959354b1552082dab849986481956b0444077ef",
            { expiresIn: "24h" }
        );
        res.json({ token });
    }
});

//profile endpoint return user info.
app.get("/profile", authorize, (req, res) => {
    res.status(200).json(req.decoded);
});

const recipesRoutes = require("./routes/recipes");

app.use("/recipes", recipesRoutes);

app.listen(PORT, () => {
    console.log(`server has started on port: ${PORT}`);
});
