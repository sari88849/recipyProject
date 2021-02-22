const router = require('express').Router()

const userFunction = require('../controllers/User')

router.get('/getByIdAndPass/:name/:password', userFunction.getByIdAndPass)
router.post('/newUser', userFunction.newUser)
// router.get('/', getAll)
router.get('/recipyByUser/:name/:password', userFunction.recipyByUser)

module.exports = router