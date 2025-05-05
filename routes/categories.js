const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// GET /api/v1/categories - Mendapatkan semua kategori
router.get("/", categoryController.getAllCategories);
// POST /api/v1/categories - Membuat kategori baru
router.post("/", categoryController.createCategory);

module.exports = router;
