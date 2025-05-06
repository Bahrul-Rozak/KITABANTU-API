const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middlewares/authMiddleware");
const { validateProjectId } = require("../validations/projectValidation");
const { validateCreateComment } = require("../validations/commentValidation");

// POST /api/v1/projects/{id}/comments - Membuat komentar baru (memerlukan autentikasi)
router.post(
  "/projects/:id/comments",
  authMiddleware.authenticate,
  validateProjectId,
  validateCreateComment,
  commentController.createComment
);

module.exports = router;
