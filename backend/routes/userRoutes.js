var express = require("express");
var userRoute = express.Router();
var User = require("../models/userSchema");

userRoute.route("")
//.get(function(req, res){
//    console.log("user route");
//    User.find({}, function(err, users){
//        if(err) res.status(500).send(err);
//        res.send(users);
//    })
//})
.post(function(req, res){
    var newUser = new User(req.body);
    console.log(newUser);
    newUser.save(function(err, savedUser){
        if(err) res.status(500).send(err);
        res.send(savedUser);
    })
})

userRoute.route("/login")
.post(function(req, res){
    var userCred = req.body;
    console.log("user cred: ", userCred);
    User.findOne(userCred, function(err, foundUser){
        console.log("found user",foundUser);
        if(err) res.status(500).send(err);
        res.send(foundUser);
    })
})

module.exports = userRoute;