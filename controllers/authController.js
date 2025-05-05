const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { sendResetPasswordEmail } = require("../utils/email");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email sudah terdaftar" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Kirim response
    res.status(201).json({
      message: "User berhasil didaftarkan",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Gagal mendaftarkan user" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cari user berdasarkan email
    const user = await User.findOne({ where: { email } });

    // Validasi user dan password
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Email atau password salah" });
    }

    // Buat JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Kirim response
    res.json({
      message: "Login berhasil",
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Gagal login" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Cari user berdasarkan email
    const user = await User.findOne({ where: { email } });

    // Jika user tidak ditemukan, tetap lanjut untuk keamanan
    if (!user) {
      return res.json({
        message: "Jika email terdaftar, link reset password akan dikirim",
      });
    }

    // Generate token reset password
    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Kirim email reset password
    await sendResetPasswordEmail(user.email, resetToken);

    // Kirim response
    res.json({
      message: "Jika email terdaftar, link reset password akan dikirim",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ error: "Gagal mengirim link reset password" });
  }
};

exports.logout = async (req, res) => {
  // Di implementasi dasar, kita hanya perlu memberi response sukses
  // Untuk implementasi penuh dengan blacklisted token bisa ditambahkan nanti
  res.json({ message: "Berhasil logout" });
};
