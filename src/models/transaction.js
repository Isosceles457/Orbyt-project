const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    tipo: { type: String, required: true },
    concepto: { type: String, required: true },
    monto: { type: Number, required: true },
    mes: { type: String, required: true },
    año: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sueldoBase: { type: Number, default: 0 } // Nuevo campo para el sueldo base
});

module.exports = mongoose.model('Transaction', transactionSchema);