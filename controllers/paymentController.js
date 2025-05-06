const { Payment, Backer } = require('../models');

exports.checkoutPayment = async (req, res) => {
  try {
    const { project_id, amount, payment_method } = req.body;
    const userId = req.user.id; // Dari JWT token
    
    // Cek apakah ada backer record untuk pembayaran ini
    const backer = await Backer.findOne({
      where: {
        user_id: userId,
        project_id,
        amount
      }
    });
    
    if (!backer) {
      return res.status(400).json({ error: 'Tidak ada record donasi untuk pembayaran ini' });
    }
    
    // Buat payment baru
    const payment = await Payment.create({
      backer_id: backer.id,
      status: 'success', // Untuk contoh, kita asumsikan pembayaran selalu sukses
      payment_method,
      payment_date: new Date()
    });
    
    // Ambil payment dengan relasi
    const createdPayment = await Payment.findByPk(payment.id, {
      include: [{ model: Backer, as: 'backer' }]
    });
    
    res.status(201).json({
      message: 'Pembayaran berhasil diproses',
      data: createdPayment
    });
  } catch (error) {
    console.error('Checkout payment error:', error);
    res.status(500).json({ error: 'Gagal memproses pembayaran' });
  }
};