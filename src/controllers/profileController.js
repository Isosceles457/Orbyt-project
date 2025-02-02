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
        const { nombre, apellido, correo, password } = req.body;
        const userId = req.session.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
        }

        user.nombre = nombre;
        user.apellido = apellido;
        user.correo = correo;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        res.json({ success: true, message: 'Perfil actualizado exitosamente' });
    } catch (error) {
        res.status(400).json({ success: false, error: 'Error al actualizar el perfil' });
    }
};