const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, noteController.getNotas);
router.post('/', authMiddleware, noteController.createNota);
router.put('/:id', authMiddleware, noteController.updateNota);
router.delete('/:id', authMiddleware, noteController.deleteNota);
router.get('/ultimas', authMiddleware, noteController.getUltimasNotas); // Nueva ruta para obtener las últimas 3 notas

module.exports = router;