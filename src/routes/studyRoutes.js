const express = require('express');
const router = express.Router();
const studyController = require('../controllers/studyController');
const authMiddleware = require('../middleware/auth');

// Rutas para tareas
router.get('/tareas', authMiddleware, studyController.getTareas);
router.post('/tareas', authMiddleware, studyController.createTarea);
router.delete('/tareas/:id', authMiddleware, studyController.deleteTarea);
router.get('/tareas/proximas', authMiddleware, studyController.getProximasTareas); // Nueva ruta para obtener las próximas tareas

// Rutas para horarios
router.get('/horarios', authMiddleware, studyController.getHorarios);
router.post('/horarios', authMiddleware, studyController.createHorario);
router.delete('/horarios/:id', authMiddleware, studyController.deleteHorario);

module.exports = router;