const mongoose = require('mongoose');

const notaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    contenido: { type: String, required: true },
    categoria: { type: String, required: true },
});

const Nota = mongoose.model('Nota', notaSchema);

module.exports = Nota;