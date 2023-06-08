const Router = require('express')
const router = new Router()
const controller = require('../controllers/authController')

router.post('/registration', controller.registration)
router.post('/login', controller.registration)
router.get('/users', controller.getUsers)

module.exports = router