const { Backer, Project, User } = require('../models');


exports.becomeBacker = async (req, res) => {
  try {
    const { id } = req.params; // project_id
    const { amount } = req.body;
    const userId = req.user.id; // Dari JWT token
    
    // Cek apakah project ada
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ error: 'Project tidak ditemukan' });
    }
    
    // Validasi jumlah donasi
    if (amount <= 0) {
      return res.status(400).json({ error: 'Jumlah donasi harus lebih dari 0' });
    }
    
    // Buat backer baru
    const backer = await Backer.create({
      user_id: userId,
      project_id: id,
      amount
    });
    
    // Update current_amount di project
    await project.update({
      current_amount: parseFloat(project.current_amount) + parseFloat(amount)
    });
    
    // Ambil backer dengan relasi
    const createdBacker = await Backer.findByPk(backer.id, {
      include: [
        { model: Project, as: 'project' },
        { 
          model: User, 
          as: 'user', 
          attributes: ['id', 'name', 'email'] 
        }
      ]
    });
    
    res.status(201).json({
      message: 'Berhasil menjadi backer',
      data: createdBacker
    });
  } catch (error) {
    console.error('Become backer error:', error);
    res.status(500).json({ error: 'Gagal menjadi backer' });
  }
};