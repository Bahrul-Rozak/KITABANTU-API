const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const authMiddleware = require("../middlewares/authMiddleware");
const { validateCreateProject } = require("../validations/projectValidation");

// GET /api/v1/projects - Mendapatkan semua project
router.get("/", projectController.getAllProjects);

// POST /api/v1/projects - Membuat project baru (memerlukan autentikasi)
router.post(
  "/",
  authMiddleware.authenticate,
  validateCreateProject,
  projectController.createProject
);

// GET /api/v1/projects/{id} - Mendapatkan detail project
router.get("/:id", projectController.getProjectById);

// GET /api/v1/projects/user/{user_id} - Mendapatkan project berdasarkan user ID
router.get("/user/:userId", projectController.getProjectsByUserId);

// GET /api/v1/projects/category/{category_id} - Mendapatkan project berdasarkan kategori ID
router.get("/category/:categoryId", projectController.getProjectsByCategoryId);

// GET /api/v1/projects/{id}/backers - Mendapatkan semua backers untuk project tertentu
router.get("/:id/backers", projectController.getProjectBackers);

// GET /api/v1/projects/{id}/comments - Mendapatkan semua komentar untuk project tertentu
router.get("/:id/comments", projectController.getProjectComments);

module.exports = router;
