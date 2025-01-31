const express = require('express');
const router = express.Router();
const notaController = require('../controllers/index');
const authRoutes = require('./auth');
const authMiddleware = require('../middleware/auth');

router.use('/auth', authRoutes);

router.get('/notas', authMiddleware, notaController.getNotas);
router.post('/notas', authMiddleware, notaController.createNota);
router.put('/notas/:id', authMiddleware, notaController.updateNota);
router.delete('/notas/:id', authMiddleware, notaController.deleteNota);

module.exports = router;