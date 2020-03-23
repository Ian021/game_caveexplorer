const mongoose = require('mongoose')

/* ------------------------------------- SCHEMAS -------------------------------------*/

const rankingSchema = new mongoose.Schema({
    list:Array,
    players:Array,
})

module.exports = mongoose.model('Ranking',rankingSchema);