const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/usuarioController')

router.get('/', usuarioController.home)
router.get('/about', usuarioController.about)
router.get('/login', usuarioController.login)
router.post('/login', usuarioController.loginPost)
router.get('/register', usuarioController.register)
router.post('/register', usuarioController.registerPost)
router.get('/logout', usuarioController.logoutUsuario)

module.exports = router