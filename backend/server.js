var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");
var mongoose = require("mongoose");
var userRoutes = require("./routes/userRoutes");
var scoresRoutes = require("./routes/scoresRoutes");

var app = express();
mongoose.connect('mongodb://localhost/gameapp', function(){
    console.log("The mongoose is loose!");
})

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());

app.use("/user", userRoutes);
//app.use("/scoresRoutes", scoresRoutes);


app.listen(3000, function(){
    console.log("Life In Express");
})