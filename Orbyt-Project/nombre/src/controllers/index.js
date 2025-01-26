const Nota = require('../models/index');

exports.getNotas = (req, res) => {
    Nota.find()
        .then(notas => res.json(notas))
        .catch(err => res.status(500).json({ error: 'Error al obtener notas' }));
};

exports.createNota = (req, res) => {
    const nuevaNota = new Nota(req.body);
    nuevaNota.save()
        .then(nota => res.status(201).json(nota))
        .catch(err => res.status(400).json({ error: 'Error al crear la nota' }));
};

exports.updateNota = (req, res) => {
    const { id } = req.params;
    Nota.findByIdAndUpdate(id, req.body, { new: true })
        .then(nota => res.json(nota))
        .catch(err => res.status(400).json({ error: 'Error al actualizar la nota' }));
};

exports.deleteNota = (req, res) => {
    const { id } = req.params;
    Nota.findByIdAndDelete(id)
        .then(() => res.json({ message: 'Nota eliminada' }))
        .catch(err => res.status(400).json({ error: 'Error al eliminar la nota' }));
};