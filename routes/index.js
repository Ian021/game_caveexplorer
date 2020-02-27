/* ------------------------------------- LIBS -------------------------------------*/
const express         = require('express')
const userModel       = require('../models/players')


/* ------------------------------------- EXPRESS -------------------------------------*/
router = express.Router()

/* ------------------------------------- ROUTES -------------------------------------*/
let soundOn = true;

router.get('/', function(req,res) {
    return res.render('home',{soundOn:soundOn})
})

router.post('/',function(req,res) {
    return res.redirect('/play')
})

router.get('/play', function(req,res) {
    return res.render('play',{soundOn:soundOn})
})

router.get('/ranking',function(req,res) {
    return res.render('ranking',{soundOn:soundOn})
})

router.post('/sound',function(req,res){
    soundOn = req.body.soundOn
    res.send({soundOn : soundOn})
})

module.exports = router