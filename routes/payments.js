const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');
const { 
  validatePaymentCheckout 
} = require('../validations/paymentValidation');

// POST /api/v1/payments/checkout - Checkout pembayaran (memerlukan autentikasi)
router.post('/payments/checkout', 
  authMiddleware.authenticate,
  validatePaymentCheckout,
  paymentController.checkoutPayment
);

module.exports = router;