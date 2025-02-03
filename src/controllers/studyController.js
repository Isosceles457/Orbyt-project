const User = require('../models/User');

// Obtener todas las tareas del usuario
exports.getTareas = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user.tareas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener tareas' });
    }
};

// Crear una nueva tarea
exports.createTarea = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const { nombre, descripcion, materia, fechaEntrega } = req.body;
        const nuevaTarea = { nombre, descripcion, materia, fechaEntrega };
        user.tareas.push(nuevaTarea);
        await user.save();
        res.status(201).json(nuevaTarea);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la tarea' });
    }
};

// Eliminar una tarea
exports.deleteTarea = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const { id } = req.params;
        const tarea = user.tareas.id(id);
        if (!tarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        tarea.remove();
        await user.save();
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar la tarea' });
    }
};

// Obtener todos los horarios del usuario
exports.getHorarios = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user.horarios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener horarios' });
    }
};

// Crear un nuevo horario
exports.createHorario = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const { asignatura, dia, hora } = req.body;
        const nuevoHorario = { asignatura, dia, hora };
        user.horarios.push(nuevoHorario);
        await user.save();
        res.status(201).json(nuevoHorario);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el horario' });
    }
};

// Eliminar un horario
exports.deleteHorario = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const { id } = req.params;
        const horario = user.horarios.id(id);
        if (!horario) {
            return res.status(404).json({ message: 'Horario no encontrado' });
        }
        horario.remove();
        await user.save();
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar el horario' });
    }
};

// Obtener las tareas con la fecha de vencimiento más cercana
exports.getProximasTareas = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const proximasTareas = user.tareas
            .filter(tarea => new Date(tarea.fechaEntrega) >= new Date())
            .sort((a, b) => new Date(a.fechaEntrega) - new Date(b.fechaEntrega))
            .slice(0, 3); // Obtener las 3 tareas más próximas
        res.json(proximasTareas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las tareas' });
    }
};