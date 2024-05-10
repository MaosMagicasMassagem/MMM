const router = express.Router()
const express = require('express')
const SessoesController = require('../controllers/sessoesController')
router.post('/confirmar-sessao', SessoesController.confirmarSessao);

router.get('', SessoesController.sessoesDashboard)
router.get('/sessao', SessoesController.createSession)
router.post('', SessoesController.createSessionSave)
router.post('', SessoesController.delete)