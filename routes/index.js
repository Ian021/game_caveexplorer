/* ------------------------------------- LIBS -------------------------------------*/
const express         = require('express')
const userModel       = require('../models/players')


/* ------------------------------------- EXPRESS -------------------------------------*/
router = express.Router()

/* ------------------------------------- ROUTES -------------------------------------*/

router.get('/', paramHandler, function(req,res) {
    return res.render('home')
})

router.get('/play', paramHandler, function(req,res) {
    return res.render('play')
})

router.get('/ranking', paramHandler, function(req,res) {
    return res.render('ranking')
})

function paramHandler (req,res,next) {

    res.locals.soundOn = req.query.soundOn === 'true' ? true : false

    if (req.query.explorer){
        res.locals.explorer = req.query.explorer
        res.locals.paramString = `?explorer=${req.query.explorer}&soundOn=${res.locals.soundOn}`
        return next()
    } else {
        res.locals.paramString = `?soundOn=${res.locals.soundOn}`
        if (req.route.path === '/') {
            return next()
        } else {
            return res.redirect('/')
        }
    }
}

module.exports = router