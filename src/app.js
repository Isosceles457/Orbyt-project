// filepath: /src/app.js
const express = require('express');
const mongoose = require('./db/connection');
const routes = require('./routes/index');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const profileRoutes = require('./routes/profileRoutes');
const noteRoutes = require('./routes/noteRoutes');
const studyRoutes = require('./routes/studyRoutes'); // Importar las rutas de estudio

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Configuración de la sesión
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/orbyt' }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 día
}));

app.use('/', routes);
app.use('/api/profile', profileRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/study', studyRoutes); // Usar las rutas de estudio

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});