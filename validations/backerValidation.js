const { body } = require('express-validator');
const { validationResult } = require('express-validator');

const validateBecomeBacker = [
  body('amount').isFloat({ min: 0.01 }).withMessage('Jumlah donasi harus lebih dari 0'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateBecomeBacker };