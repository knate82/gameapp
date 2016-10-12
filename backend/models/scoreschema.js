var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema = require("./userschema")

var scoreSchema = new Schema({
    score: Number, 
    userName: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
})

module.exports = mongoose.model("score", scoreSchema);