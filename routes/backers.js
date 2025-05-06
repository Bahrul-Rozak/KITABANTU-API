const express = require("express");
const router = express.Router();
const backerController = require("../controllers/backerController");
const authMiddleware = require("../middlewares/authMiddleware");
const { validateProjectId } = require("../validations/projectValidation");
const { validateBecomeBacker } = require("../validations/backerValidation");

// POST /api/v1/projects/{id}/backers - Menjadi backer (memerlukan autentikasi)
router.post(
  // "/projects/:id/backers",
  "/:id/backers",
  authMiddleware.authenticate,
  validateProjectId,
  validateBecomeBacker,
  backerController.becomeBacker
);

module.exports = router;
