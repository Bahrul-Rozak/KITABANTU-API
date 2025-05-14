const { Category } = require("../models");

// Mendapatkan semua kategori (sudah ada)
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [["created_at", "DESC"]],
    });
    res.json({
      message: "Berhasil mengambil daftar kategori",
      data: categories,
    });
  } catch (error) {
    console.error("Get all categories error:", error);
    res.status(500).json({ error: "Gagal mengambil daftar kategori" });
  }
};

// Membuat kategori baru
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Cek apakah kategori dengan nama yang sama sudah ada
    const existingCategory = await Category.findOne({
      where: { name },
    });

    if (existingCategory) {
      return res.status(400).json({
        error: "Kategori dengan nama ini sudah ada",
      });
    }

    // Jika belum ada, buat kategori baru
    const category = await Category.create({ name });
    res.status(201).json({
      message: "Kategori berhasil dibuat",
      data: category,
    });
  } catch (error) {
    console.error("Create category error:", error);
    res.status(500).json({ error: "Gagal membuat kategori" });
  }
};
