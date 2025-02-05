const Transaction = require('../models/transaction');

exports.getTransactions = async (req, res) => {
    try {
        const { mes, año } = req.params;
        const transactions = await Transaction.find({ mes, año, userId: req.user._id });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener transacciones' });
    }
};

exports.createTransaction = async (req, res) => {
    try {
        const { tipo, concepto, monto, mes, año } = req.body;
        const transaction = new Transaction({ tipo, concepto, monto, mes, año, userId: req.user._id });
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la transacción' });
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findById(id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transacción no encontrada' });
        }
        if (transaction.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'No autorizado' });
        }
        await transaction.remove();
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar la transacción' });
    }
};

exports.setBaseSalary = async (req, res) => {
    try {
        const { sueldoBase, mes, año } = req.body;
        const transaction = await Transaction.findOneAndUpdate(
            { mes, año, userId: req.user._id, tipo: 'sueldoBase' },
            { monto: sueldoBase },
            { new: true, upsert: true }
        );
        res.status(200).json(transaction);
    } catch (error) {
        res.status(400).json({ message: 'Error al establecer el sueldo base' });
    }
};