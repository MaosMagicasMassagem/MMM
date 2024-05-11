const express = require('express')
const router = express.Router()
const SessoesController = require('../controllers/sessoesController')

router.get('', SessoesController.sessoesDashboard)
router.get('/sessao', SessoesController.createSession)
router.post('', SessoesController.createSessionSave)
router.post('', SessoesController.delete)

module.exports = router