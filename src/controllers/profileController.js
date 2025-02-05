const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getProfile = async (req, res) => {
    try {
        const userId = req.session.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
        }

        res.json({ success: true, user });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Error al obtener el perfil' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.session.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
        }

        const { nombre, apellido, correo, password } = req.body;

        console.log('Datos recibidos para actualizar:', { nombre, apellido, correo, password });

        user.nombres = nombre;
        user.apellidos = apellido;
        user.username = correo;
        if (password) {
            user.password = password
        }

        await user.save();

        console.log('Usuario actualizado:', user);

        res.json({ success: true, message: 'Perfil actualizado exitosamente', user });
    } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        res.status(400).json({ success: false, error: 'Error al actualizar el perfil' });
    }
};