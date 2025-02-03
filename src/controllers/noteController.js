const User = require('../models/User');

// Obtener todas las notas del usuario
exports.getNotas = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user.notas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener notas' });
    }
};

// Crear una nueva nota
exports.createNota = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const { titulo, contenido } = req.body;
        const nuevaNota = { titulo, contenido };
        user.notas.push(nuevaNota);
        await user.save();
        res.status(201).json(nuevaNota);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la nota' });
    }
};

// Actualizar una nota
exports.updateNota = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const { id } = req.params;
        const { titulo, contenido } = req.body;
        const nota = user.notas.id(id);
        if (!nota) {
            return res.status(404).json({ message: 'Nota no encontrada' });
        }
        nota.titulo = titulo;
        nota.contenido = contenido;
        await user.save();
        res.json(nota);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar la nota' });
    }
};

// Eliminar una nota
exports.deleteNota = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const { id } = req.params;
        const nota = user.notas.id(id);
        if (!nota) {
            return res.status(404).json({ message: 'Nota no encontrada' });
        }
        nota.remove();
        await user.save();
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar la nota' });
    }
};
exports.getUltimasNotas = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const ultimasNotas = user.notas.slice(-3).reverse(); // Obtener las últimas 3 notas
        res.json(ultimasNotas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las notas' });
    }
};