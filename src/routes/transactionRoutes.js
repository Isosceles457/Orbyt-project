const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middleware/auth');

router.get('/:mes/:año', authMiddleware, transactionController.getTransactions);
router.post('/', authMiddleware, transactionController.createTransaction);
router.delete('/:id', authMiddleware, transactionController.deleteTransaction);
router.post('/sueldoBase', authMiddleware, transactionController.setBaseSalary); // Nueva ruta para el sueldo base

module.exports = router;