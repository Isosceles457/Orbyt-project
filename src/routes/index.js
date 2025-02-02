const express = require('express');
const router = express.Router();
const notaController = require('../controllers/index');
const authRoutes = require('./auth');
const authMiddleware = require('../middleware/auth');
const path = require('path');

router.use('/auth', authRoutes);

// Ruta raíz
router.get('/', (req, res) => {
    res.redirect('/iniciosesion'); // Redirigir a la página de inicio de sesión
});

// Protege las rutas de notas con el middleware de autenticación
router.get('/notas', authMiddleware, notaController.getNotas);
router.post('/notas', authMiddleware, notaController.createNota);
router.put('/notas/:id', authMiddleware, notaController.updateNota);
router.delete('/notas/:id', authMiddleware, notaController.deleteNota);

// Rutas para las vistas
router.get('/dashboard', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views/dashboard.html'));
});

router.get('/estudio', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views/estudio.html'));
});

router.get('/iniciosesion', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views/iniciosesion.html'));
});

router.get('/perfil', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views/perfil.html'));
});

router.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views/registro.html'));
});

module.exports = router;