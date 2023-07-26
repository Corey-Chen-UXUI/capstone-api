const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(cors());
//parse JSON in requests
app.use(express.json());

//server static file
app.use(express.static("public"));

const recipesRoutes = require("./routes/recipes");

app.use("/recipes", recipesRoutes);

const PORT = process.env.PORT;

app.listen(5050, () => {
    console.log(`server has started on port: ${PORT}`);
});
