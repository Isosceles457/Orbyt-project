const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const noteRoutes = require('./noteRoutes'); // Importa las rutas de notas
const authMiddleware = require('../middleware/auth');
const path = require('path');

router.use('/auth', authRoutes);
router.use('/api/notes', noteRoutes); // Usa las rutas de notas

// Ruta raíz
router.get('/', (req, res) => {
    res.redirect('/iniciosesion'); // Redirigir a la página de inicio de sesión
});

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

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views/notes.html'));
});

module.exports = router;