const { Comment, Project, User } = require('../models');

exports.createComment = async (req, res) => {
  try {
    const { id } = req.params; // project_id
    const { comment } = req.body;
    const userId = req.user.id; // Dari JWT token

    // Cek apakah proyek dan komentar valid
    if (!comment) {
      return res.status(400).json({ error: 'Komentar tidak boleh kosong' });
    }

    // Cek apakah project ada
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ error: "Project tidak ditemukan" });
    }

    // Validasi apakah user ada
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User tidak ditemukan" });
    }

    // Buat komentar baru
    const newComment = await Comment.create({
      user_id: userId,
      project_id: id,
      comment,
    });

    // Ambil komentar dengan relasi
    const createdComment = await Comment.findByPk(newComment.id, {
      include: [
        { model: Project, as: "project" },
        { model: User, as: "user", attributes: ["id", "name", "email"] },
      ],
    });

    res.status(201).json({
      message: "Komentar berhasil dibuat",
      data: createdComment,
    });
  } catch (error) {
    console.error("Create comment error:", error);
    res.status(500).json({
      error: "Gagal membuat komentar",
      details: error.message,
    });
  }
};
