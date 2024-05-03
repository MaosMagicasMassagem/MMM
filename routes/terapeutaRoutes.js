const express = require('express')
const router = express.Router()
const TerapeutaController = require('../controllers/terapeutaController')

router.get('', TerapeutaController.page)
router.post('', TerapeutaController.pagePost)
router.get('', TerapeutaController.show)
router.post('', TerapeutaController.delete)

module.exports = router