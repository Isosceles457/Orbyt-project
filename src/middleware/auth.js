const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.redirect('/iniciosesion');
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Error de servidor' });
    }
};