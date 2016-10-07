var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema = require("./userschema")

var scoreSchema = new Schema({
    scores: [],
    userName: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("scores", scoreSchema);