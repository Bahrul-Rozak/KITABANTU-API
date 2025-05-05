const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
  validateRegister,
  validateLogin,
} = require("../validations/authValidation");
const authMiddleware = require('../middlewares/authMiddleware');

// POST /api/v1/auth/register
router.post("/register", validateRegister, authController.register);

// POST /api/v1/auth/login
router.post("/login", validateLogin, authController.login);

// POST /api/v1/auth/forgot-password
router.post("/forgot-password", authController.forgotPassword);

// POST /api/v1/auth/logout
router.post('/logout', authMiddleware.authenticate, authController.logout);

module.exports = router;
