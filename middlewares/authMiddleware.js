const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  try {
    // Ambil token dari header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token tidak ditemukan" });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Simpan data user ke request
    req.user = decoded;

    // Lanjutkan ke middleware berikutnya
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Token tidak valid" });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token telah kadaluarsa" });
    }

    res.status(401).json({ error: "Autentikasi gagal" });
  }
};
