var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");
var mongoose = require("mongoose");
var path = require("path");
var userRoutes = require("./routes/userRoutes");
var scoresRoutes = require("./routes/scoresRoutes");

var app = express();
mongoose.connect('mongodb://localhost/gameapp', function(){
    console.log("The mongoose is loose!");
})

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "frontend")));

app.use("/user", userRoutes);
app.use("/scores", scoresRoutes);


app.listen(3000, function(){
    console.log("Life In Express");
})