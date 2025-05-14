const { Project, User, Category, Backer, Comment } = require("../models");

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [
        { model: User, as: "user", attributes: ["id", "name", "email"] },
        { model: Category, as: "category", attributes: ["id", "name"] },
      ],
      order: [["created_at", "DESC"]],
    });

    res.json({
      message: "Berhasil mengambil daftar project",
      data: projects,
    });
  } catch (error) {
    console.error("Get all projects error:", error);
    res.status(500).json({ error: "Gagal mengambil daftar project" });
  }
};

exports.createProject = async (req, res) => {
  try {
    const {
      category_id,
      title,
      description,
      goal_amount,
      start_date,
      end_date,
    } = req.body;
    const userId = req.user.id;

    // Validasi tanggal
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    if (endDate <= startDate) {
      return res
        .status(400)
        .json({ error: "Tanggal akhir harus setelah tanggal mulai" });
    }

    // Validasi keberadaan kategori
    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(404).json({ error: "Kategori tidak ditemukan" });
    }

    // Validasi keberadaan pengguna (opsional jika authMiddleware sudah memastikan)
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Pengguna tidak ditemukan" });
    }

    const existingProject = await Project.findOne({ where: { title } });
    if (existingProject) {
      return res
        .status(409)
        .json({ error: "Judul project sudah digunakan, gunakan judul lain." });
    }

    // Buat project
    const project = await Project.create({
      user_id: userId,
      category_id,
      title,
      description,
      goal_amount,
      current_amount: 0,
      start_date: startDate,
      end_date: endDate,
    });

    // Ambil project dengan relasi
    const createdProject = await Project.findByPk(project.id, {
      include: [
        { model: User, as: "user", attributes: ["id", "name", "email"] },
        { model: Category, as: "category", attributes: ["id", "name"] },
      ],
    });

    res.status(201).json({
      message: "Project berhasil dibuat",
      data: createdProject,
    });
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({ error: "Gagal membuat project" });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id, {
      include: [
        { model: User, as: "user", attributes: ["id", "name", "email"] },
        { model: Category, as: "category", attributes: ["id", "name"] },
      ],
    });

    if (!project) {
      return res.status(404).json({ error: "Project tidak ditemukan" });
    }

    res.json({
      message: "Berhasil mengambil detail project",
      data: project,
    });
  } catch (error) {
    console.error("Get project by ID error:", error);
    res.status(500).json({ error: "Gagal mengambil detail project" });
  }
};

exports.getProjectBackers = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ error: "Project tidak ditemukan" });
    }

    const backers = await Backer.findAll({
      where: { project_id: id },
      include: [
        { model: User, as: "user", attributes: ["id", "name", "email"] },
      ],
    });

    res.json({
      message: "Berhasil mengambil daftar backers",
      data: backers,
    });
  } catch (error) {
    console.error("Get project backers error:", error);
    res.status(500).json({ error: "Gagal mengambil daftar backers" });
  }
};

exports.getProjectComments = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ error: "Project tidak ditemukan" });
    }

    const comments = await Comment.findAll({
      where: { project_id: id },
      include: [
        { model: User, as: "user", attributes: ["id", "name", "email"] },
      ],
      order: [["created_at", "ASC"]],
    });

    res.json({
      message: "Berhasil mengambil daftar komentar",
      data: comments,
    });
  } catch (error) {
    console.error("Get project comments error:", error);
    res.status(500).json({ error: "Gagal mengambil daftar komentar" });
  }
};

exports.getProjectsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User tidak ditemukan" });
    }

    const projects = await Project.findAll({
      where: { user_id: userId },
      include: [
        { model: User, as: "user", attributes: ["id", "name", "email"] },
        { model: Category, as: "category", attributes: ["id", "name"] },
      ],
      order: [["created_at", "DESC"]],
    });

    res.json({
      message: `Berhasil mengambil daftar project untuk user ID ${userId}`,
      data: projects,
    });
  } catch (error) {
    console.error("Get projects by user ID error:", error);
    res.status(500).json({ error: "Gagal mengambil daftar project" });
  }
};

exports.getProjectsByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Kategori tidak ditemukan" });
    }

    const projects = await Project.findAll({
      where: { category_id: categoryId },
      include: [
        { model: User, as: "user", attributes: ["id", "name", "email"] },
        { model: Category, as: "category", attributes: ["id", "name"] },
      ],
      order: [["created_at", "DESC"]],
    });

    res.json({
      message: `Berhasil mengambil daftar project untuk kategori ID ${categoryId}`,
      data: projects,
    });
  } catch (error) {
    console.error("Get projects by category ID error:", error);
    res.status(500).json({ error: "Gagal mengambil daftar project" });
  }
};
