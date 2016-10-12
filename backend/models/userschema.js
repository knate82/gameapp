var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//var scoreSchema = require("./scoreschema")

var userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    scores: [{
        type: Schema.Types.ObjectId,
        ref: "scores"
    }]
});

module.exports = mongoose.model("user", userSchema);