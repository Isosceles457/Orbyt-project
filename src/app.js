const express = require('express');
const mongoose = require('./db/connection');
const routes = require('./routes/index');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const profileRoutes = require('./routes/profileRoutes');
const noteRoutes = require('./routes/noteRoutes');
const studyRoutes = require('./routes/studyRoutes');
const transactionRoutes = require('./routes/transactionRoutes'); // Importar las rutas de transacciones

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/orbyt' }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use('/', routes);
app.use('/api/profile', profileRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/study', studyRoutes);
app.use('/api/finanzas', transactionRoutes); // Usar las rutas de transacciones

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});