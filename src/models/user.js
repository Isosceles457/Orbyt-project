const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const notaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    contenido: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now }
});

const tareaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    materia: { type: String, required: true },
    fechaEntrega: { type: Date, required: true }
});

const horarioSchema = new mongoose.Schema({
    asignatura: { type: String, required: true },
    dia: { type: String, required: true },
    horaI: { type: String, required: true },
    horaF: { type: String, required: true }

});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String },
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    notas: [notaSchema], // Añadir el campo de notas
    tareas: [tareaSchema], // Añadir el campo de tareas
    horarios: [horarioSchema] // Añadir el campo de horarios
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);