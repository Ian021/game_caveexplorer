/* ------------------------------------- LIBS -------------------------------------*/
const express         = require('express')
const userModel       = require('../models/players')


/* ------------------------------------- EXPRESS -------------------------------------*/
router = express.Router()

/* ------------------------------------- ROUTES -------------------------------------*/
router.get('/', function(req,res) {
    return res.render('home')
})

router.post('/',function(req,res) {
    return res.redirect('/play')
})

router.get('/play', function(req,res) {
    return res.render('play')
})

router.get('/ranking',function(req,res) {
    return res.render('ranking')
})

module.exports = router