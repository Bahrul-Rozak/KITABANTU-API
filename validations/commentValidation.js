const { body } = require('express-validator');
const { validationResult } = require('express-validator');

const validateCreateComment = [
  body('comment').notEmpty().withMessage('Komentar harus diisi'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateCreateComment };