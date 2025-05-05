const { body } = require("express-validator");
const { validationResult } = require("express-validator");

const validateRegister = [
  body("name").notEmpty().withMessage("Nama harus diisi"),
  body("email").isEmail().withMessage("Format email tidak valid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),
  body("role").optional(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateLogin = [
  body("email").isEmail().withMessage("Format email tidak valid"),
  body("password").notEmpty().withMessage("Password harus diisi"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateRegister, validateLogin };
