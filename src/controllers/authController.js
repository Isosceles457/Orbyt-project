const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { nombres, apellidos, fechaNacimiento, username, password } = req.body;
        const user = new User({ nombres, apellidos, fechaNacimiento, username, password });
        await user.save();
        res.status(201).json({ message: 'Usuario registrado con éxito' }); // Enviar respuesta JSON
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Error al registrar usuario' });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, error: 'Credenciales incorrectas' });
        }
        req.session.userId = user._id; // Guardar el ID del usuario en la sesión
        res.json({ success: true, message: 'Inicio de sesión exitoso' }); // Devolver una respuesta JSON
    } catch (error) {
        res.status(400).json({ success: false, error: 'Error al iniciar sesión' });
    }
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ success: false, error: 'No se pudo cerrar la sesión' });
        }
        res.clearCookie('connect.sid');
        res.json({ success: true, message: 'Sesión cerrada exitosamente' });
    });
};

exports.updateProfile = async (req, res) => {
    try {
        const { nombre, apellido, username, correo, fecha } = req.body;
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        user.nombre = nombre;
        user.apellido = apellido;
        user.username = username;
        user.correo = correo;
        user.fecha = fecha;
        await user.save();
        res.redirect('/perfil'); // Redirigir a la página de perfil después de actualizar
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el perfil' });
    }
};