var express = require("express");
var scoresRoutes = express.Router();
var Score = require("../models/scoreschema");

scoresRoutes.route("")
    .get(function(req,res){
        Score.find({})
        .populate("userName")
        .exec(function(err, foundScores){
            if(err) res.status(500).send(err);
            console.log(foundScores);
            res.send(foundScores);
        })
    })
    .post(function(req, res){
    var newScore = new Score(req.body);
    console.log(newScore);
    newScore.save(function(err, savedScore){
        if(err) res.status(500).send(err);
        res.send(savedScore);
    })
})


module.exports = scoresRoutes;