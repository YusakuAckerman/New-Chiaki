const mongoose = require("mongoose");

const moneySchema = mongoose.Schema({
    userID: String,
    coins: Number
})

module.exports = mongoose.model("Money", moneySchema); 