const mongoose = require('mongoose')

/* ------------------------------------- SCHEMAS -------------------------------------*/

const userSchema = new mongoose.Schema({
    player:String,
    score:Number,
})

module.exports = mongoose.model('User',userSchema);