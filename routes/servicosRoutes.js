const router = express.Router()
const express = require('express')
const ServicosController = require('../controllers/servicosController')


router.get('', ServicosController.register)
router.post('', ServicosController.registerPost)
router.post('', ServicosController.delete)
module.exports = router