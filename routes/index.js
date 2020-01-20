/* ------------------------------------- LIBS -------------------------------------*/
const express         = require('express')
const userModel       = require('../models/players')


/* ------------------------------------- EXPRESS -------------------------------------*/
router = express.Router()

/* ------------------------------------- ROUTES -------------------------------------*/
router.get('/', function(req,res){
    res.render('home')
})

module.exports = router