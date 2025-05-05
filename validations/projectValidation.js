const { body, param } = require("express-validator");
const { validationResult } = require("express-validator");

const validateCreateProject = [
  body("category_id").isInt().withMessage("Category ID harus berupa angka"),
  body("title").notEmpty().withMessage("Judul project harus diisi"),
  body("description").notEmpty().withMessage("Deskripsi project harus diisi"),
  body("goal_amount")
    .isFloat({ min: 0 })
    .withMessage("Goal amount harus berupa angka positif"),
  body("start_date")
    .notEmpty()
    .withMessage("Tanggal mulai harus diisi")
    .isISO8601()
    .withMessage(
      "Format tanggal mulai tidak valid (harus dalam format YYYY-MM-DD)"
    ),
  body("end_date")
    .notEmpty()
    .withMessage("Tanggal akhir harus diisi")
    .isISO8601()
    .withMessage(
      "Format tanggal akhir tidak valid (harus dalam format YYYY-MM-DD)"
    ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateCreateProject };
