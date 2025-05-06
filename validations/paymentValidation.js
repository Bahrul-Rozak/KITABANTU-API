const { body } = require('express-validator');
const { validationResult } = require('express-validator');

const validatePaymentCheckout = [
  body('project_id').isInt().withMessage('Project ID harus berupa angka'),
  body('amount').isFloat({ min: 0.01 }).withMessage('Jumlah pembayaran harus lebih dari 0'),
  body('payment_method').notEmpty().withMessage('Metode pembayaran harus diisi'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validatePaymentCheckout };